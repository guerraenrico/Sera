const express = require("express");

const needAuth = require("../middleware/authMiddleware");
const { catchErrors, errorHandler } = require("../middleware//errorMiddleware");

const Task = require("../models/Task");
const ItemOrder = require("../models/ItemOrder");

const errorCodes = require("../constants/errorCodes");
const ApiError = require("../error/ApiError");
const ApiResponse = require("../ApiResponse");
const BadRequestError = require("../error/BadRequestError");

const { isNullOrUndefined } = require("../utils/common");

const router = express.Router();

// Get Tasks

router.get(
  "/",
  needAuth,
  catchErrors(async (req, res) => {
    const { session } = res.locals;
    // Limit results only if no filter selected
    const limit = isNullOrUndefined(req.query.limit)
      ? undefined
      : parseInt(req.query.limit, 10);
    const skip = isNullOrUndefined(req.query.skip)
      ? undefined
      : parseInt(req.query.skip, 10);
    const completed = req.query.completed === "true";
    const categoriesId =
      isNullOrUndefined(req.query.categoriesId) || req.query.categoriesId === ""
        ? []
        : req.query.categoriesId.split(",");
    try {
      const itemOrder = await ItemOrder.GetAsync(
        session.userId,
        Task.Schema.name,
        { completed }
      );

      let tasks = [];
      if (
        (!isNullOrUndefined(categoriesId) && categoriesId.length > 0) ||
        isNullOrUndefined(itemOrder)
      ) {
        tasks = await Task.GetAllAsync({
          userId: session.userId,
          limit,
          skip,
          completed,
          categoriesId,
          ...(completed && {
            orderBy: { [Task.Schema.fields.completedAt]: -1 }
          })
        });
      } else {
        tasks = await Task.GetAllByIdsAsync(
          session.userId,
          !isNullOrUndefined(limit) && !isNullOrUndefined(skip)
            ? itemOrder.orderedIds.slice(skip, skip + limit)
            : itemOrder.orderedIds
        );
      }

      let orederedTasks = [];

      // Should run only the first time
      if (
        isNullOrUndefined(itemOrder) ||
        isNullOrUndefined(itemOrder.orderedIds)
      ) {
        const allTasks = await Task.GetAllAsync({
          userId: session.userId,
          completed
        });
        await ItemOrder.InsertAsync(
          ItemOrder.New({
            orderedIds: allTasks.map(t => t.id.valueOf().toString()),
            collection: Task.Schema.name,
            userId: session.userId,
            filter: { completed }
          })
        );
        orederedTasks = [...tasks];
      } else {
        // Order items
        itemOrder.orderedIds.forEach(id => {
          const tf = tasks.find(t => t.id.toString() === id);
          if (tf !== undefined && tf !== null) {
            orederedTasks = [...orederedTasks, tf];
          }
        });
      }
      res.status(200).json(ApiResponse.success(orederedTasks));
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_READ_TASK, e.message);
    }
  })
);

// Insert Task

router.post(
  "/",
  needAuth,
  catchErrors(async (req, res) => {
    const { session } = res.locals;
    const { body } = req;
    const task = Task.ParseFields(body);
    if (
      isNullOrUndefined(task) ||
      isNullOrUndefined(task.title) ||
      isNullOrUndefined(task.todoWithin)
    ) {
      throw new BadRequestError(
        errorCodes.INVALID_TASK_PARAMETERS,
        "Invalid params"
      );
    }
    try {
      const result = await Task.InsertAsync(task, session.userId);
      if (!isNullOrUndefined(result.insertedId)) {
        await ItemOrder.PrependIdAsync(
          session.userId,
          Task.Schema.name,
          {
            completed: false
          },
          result.insertedId.valueOf().toString()
        );
        res
          .status(200)
          .json(
            ApiResponse.success({ ...result.ops[0], id: result.insertedId })
          );
      } else {
        throw new ApiError(errorCodes.ERROR_INSERT_TASK, "Error insert task");
      }
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_INSERT_TASK, e.message);
    }
  })
);

// Delete Task

router.delete(
  "/:id",
  needAuth,
  catchErrors(async (req, res) => {
    const { session } = res.locals;
    const { id } = req.params;
    if (isNullOrUndefined(id) || id.toString() === "") {
      throw new BadRequestError(
        errorCodes.INVALID_TASK_PARAMETERS,
        "Missing param id"
      );
    }
    try {
      const task = await Task.GetAsync(session.userId, id);
      const result = await Task.DeleteAsync(session.userId, id);
      if (result.deletedCount >= 1) {
        if (!isNullOrUndefined(task)) {
          await ItemOrder.RemoveIdAsync(
            session.userId,
            Task.Schema.name,
            {
              completed: task.completed
            },
            id
          );
        }
        res.status(200);
      } else {
        throw new ApiError(errorCodes.ERROR_DELETE_TASK, "Error delete task");
      }
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_DELETE_TASK, e.message);
    }
  })
);

// Update Task

router.patch(
  "/",
  needAuth,
  catchErrors(async (req, res) => {
    const { body } = req;
    const task = Task.ParseFields(body);
    if (isNullOrUndefined(task) || isNullOrUndefined(task.id)) {
      throw new BadRequestError(
        errorCodes.INVALID_TASK_PARAMETERS,
        "Missing params"
      );
    }
    try {
      const result = await Task.UpdateAsync(task.id, task);
      if (!isNullOrUndefined(result) && result.ok === 1) {
        res
          .status(200)
          .json(ApiResponse.success(Task.CreateFromDocument(result.value)));
      } else {
        throw new ApiError(errorCodes.ERROR_UPDATE_TASK, "Error update task");
      }
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_UPDATE_TASK, e.message);
    }
  })
);

router.patch(
  "/position",
  needAuth,
  catchErrors(async (req, res) => {
    const { session } = res.locals;
    const { body } = req;
    const { nextId } = body;
    const task = Task.ParseFields(body.task);
    if (
      isNullOrUndefined(task) ||
      isNullOrUndefined(task.id) ||
      isNullOrUndefined(task.completed)
    ) {
      throw new BadRequestError(
        errorCodes.INVALID_TASK_PARAMETERS,
        "Missing params"
      );
    }

    try {
      const result = await ItemOrder.MoveIdAsync(
        session.userId,
        Task.Schema.name,
        { completed: task.completed },
        nextId,
        task.id
      );
      if (!isNullOrUndefined(result) && result.ok === 1) {
        res.status(200);
      } else {
        throw new ApiError(
          errorCodes.ERROR_UPDATE_TASK,
          "Error update task position"
        );
      }
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_UPDATE_TASK, e.message);
    }
  })
);

router.patch(
  "/toggle-complete",
  needAuth,
  catchErrors(async (req, res) => {
    const { session } = res.locals;
    const { body } = req;
    const task = Task.ParseFields(body);
    const { id, completed, completedAt } = task;
    if (isNullOrUndefined(id) || isNullOrUndefined(completed)) {
      throw new BadRequestError(
        errorCodes.INVALID_TASK_PARAMETERS,
        "Missing params"
      );
    }
    if (completed && isNullOrUndefined(completedAt)) {
      throw new BadRequestError(
        errorCodes.INVALID_TASK_PARAMETERS,
        "Missing param completedAt"
      );
    }
    try {
      // If completed remove task id from item order tasks to complete
      // else remove from completed tasks
      await ItemOrder.RemoveIdAsync(
        session.userId,
        Task.Schema.name,
        { completed: !completed },
        id
      );
      // If completed add task id to item order task completed
      // else add to task to complete
      await ItemOrder.PrependIdAsync(
        session.userId,
        Task.Schema.name,
        { completed },
        id
      );

      const result = await Task.UpdateAsync(id, {
        completed,
        completedAt
      });
      if (!isNullOrUndefined(result) && result.ok === 1) {
        res
          .status(200)
          .json(ApiResponse.success(Task.CreateFromDocument(result.value)));
      } else {
        throw new ApiError(
          errorCodes.ERROR_UPDATE_TASK,
          "Error toogle task completed status"
        );
      }
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_UPDATE_TASK, e.message);
    }
  })
);

router.get(
  "/search",
  needAuth,
  catchErrors(async (req, res) => {
    const { session } = res.locals;
    const text = req.query.text || "";
    const completed = req.query.completed === "true";
    try {
      const itemOrder = await ItemOrder.GetAsync(
        session.userId,
        Task.Schema.name,
        { completed }
      );

      const tasks = await Task.SearchAsync(session.userId, text);

      let orederedTasks = [];
      itemOrder.orderedIds.forEach(id => {
        const tf = tasks.find(t => t.id.toString() === id);
        if (tf !== undefined && tf !== null) {
          orederedTasks = [...orederedTasks, tf];
        }
      });

      res.status(200).json(ApiResponse.success(orederedTasks));
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_READ_TASK, e.message);
    }
  })
);

router.use(errorHandler);

module.exports = router;
