const express = require("express");

const needAuth = require("../middleware/authMiddleware");

const Task = require("../models/Task");
const ItemOrder = require("../models/ItemOrder");
const ApiErrors = require("../ApiErrors");
const { handleError, handleResponse } = require("../Handlers");

const { isNullOrUndefined } = require("../utils/common");

const router = express.Router();

// Get Tasks

router.get("/", (req, res) =>
  needAuth(req, res, async session => {
    // Limit results only if no filter selected
    const limit = isNullOrUndefined(req.query.limit)
      ? 0
      : parseInt(req.query.limit, 10);
    const skip = isNullOrUndefined(req.query.skip)
      ? 0
      : parseInt(req.query.skip, 10);
    const completed = req.query.completed === "true";
    const categoriesId = isNullOrUndefined(req.query.categoriesId)
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
          categoriesId
        });
      } else {
        tasks = await Task.GetAllByIdsAsync(
          session.userId,
          itemOrder.orderedIds.slice(skip, skip + limit)
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
      handleResponse(res, orederedTasks, session.accessToken);
    } catch (e) {
      console.log("err", e.message);
      handleError(res, ApiErrors.ErrorReadTask(e), 500, session.accessToken);
    }
  })
);

// Insert Task

router.post("/", (req, res) =>
  needAuth(req, res, async session => {
    const { body } = req;
    const task = Task.CreateFromBodyRequest(body, session.userId);
    if (isNullOrUndefined(task)) {
      handleError(
        res,
        ApiErrors.InvalidTaskParameters(),
        400,
        session.accessToken
      );
      return;
    }
    try {
      task.position = 0;
      const result = await Task.InsertAsync(task);
      if (!isNullOrUndefined(result.insertedId)) {
        await ItemOrder.PrependIdAsync(
          session.userId,
          Task.Schema.name,
          {
            completed: task.completed
          },
          result.insertedId.valueOf().toString()
        );

        handleResponse(
          res,
          { ...task, id: result.insertedId },
          session.accessToken
        );
      } else {
        handleError(res, ApiErrors.ErrorInsertTask(), 500, session.accessToken);
      }
    } catch (e) {
      console.log("err", e.message);
      handleError(res, ApiErrors.ErrorInsertTask(e), 500, session.accessToken);
    }
  })
);

// Delete Task

router.delete("/:id", (req, res) =>
  needAuth(req, res, async session => {
    const { id } = req.params;
    if (isNullOrUndefined(id) || id.toString() === "") {
      handleError(res, ApiErrors.InvalidTaskId(), 400, session.accessToken);
      return;
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
        handleResponse(res, {}, session.accessToken);
      } else {
        handleError(res, ApiErrors.ErrorDeleteTask(), 500, session.accessToken);
      }
    } catch (e) {
      console.log("err", e.message);
      handleError(res, ApiErrors.ErrorDeleteTask(e), 500, session.accessToken);
    }
  })
);

// Update Task

router.patch("/", (req, res) =>
  needAuth(req, res, async session => {
    const { body } = req;
    const { id, ...other } = body;
    if (isNullOrUndefined(id)) {
      handleError(
        res,
        ApiErrors.InvalidTaskParameters(),
        400,
        session.accessToken
      );
      return;
    }
    try {
      const result = await Task.UpdateAsync(id, { ...other });
      if (!isNullOrUndefined(result) && result.ok === 1) {
        handleResponse(
          res,
          { ...Task.CreateFromDocument(result.value), ...other },
          session.accessToken
        );
      } else {
        handleError(res, ApiErrors.ErrorUpdateTask(), 500, session.accessToken);
      }
    } catch (e) {
      console.log("err", e.message);
      handleError(res, ApiErrors.ErrorUpdateTask(e), 500, session.accessToken);
    }
  })
);

router.patch("/position", (req, res) =>
  needAuth(req, res, async session => {
    const { body } = req;
    const { task, nextId } = body;
    if (isNullOrUndefined(task)) {
      handleError(
        res,
        ApiErrors.InvalidTaskParameters(),
        400,
        session.accessToken
      );
      return;
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
        handleResponse(res, {}, session.accessToken);
      } else {
        handleError(res, ApiErrors.ErrorUpdateTask(), 500, session.accessToken);
      }
    } catch (e) {
      console.log("err", e.message);
      handleError(res, ApiErrors.ErrorUpdateTask(e), 500, session.accessToken);
    }
  })
);

router.patch("/toggle-complete", (req, res) =>
  needAuth(req, res, async session => {
    const { body } = req;
    const { id, completed, completedAt } = body;
    if (isNullOrUndefined(id) || isNullOrUndefined(completed)) {
      handleError(
        res,
        ApiErrors.InvalidTaskParameters(),
        400,
        session.accessToken
      );
      return;
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
        handleResponse(
          res,
          {
            ...Task.CreateFromDocument(result.value),
            completed,
            completedAt
          },
          session.accessToken
        );
      } else {
        handleError(res, ApiErrors.ErrorUpdateTask(), 500, session.accessToken);
      }
    } catch (e) {
      console.log("err", e.message);
      handleError(res, ApiErrors.ErrorUpdateTask(e), 500, session.accessToken);
    }
  })
);

router.get("/search", (req, res) =>
  needAuth(req, res, async session => {
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

      handleResponse(res, orederedTasks, 500, session.accessToken);
    } catch (e) {
      console.log("err", e.message);
      handleError(res, ApiErrors.ErrorReadTask(e), 500, session.accessToken);
    }
  })
);

module.exports = router;
