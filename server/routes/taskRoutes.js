const express = require("express");

const connection = require("../middleware/dbConnectionMiddleware");
const needAuth = require("../middleware/authMiddleware");

const Task = require("../models/Task");
const ItemOrder = require("../models/ItemOrder");
const ApiErrors = require("../ApiErrors");
const { handleError, handleResponse } = require("../Handlers");

const router = express.Router();

// Get Tasks

router.get("/", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      // Limit results only if no filter selected
      const limit = req.query.limit && parseInt(req.query.limit, 10);
      const skip = req.query.skip && parseInt(req.query.skip, 10);
      const completed = req.query.completed === "true";
      const categoriesId =
        req.query.categoriesId && req.query.categoriesId.split(",");
      try {
        const itemOrder = await ItemOrder.GetAsync(
          db,
          session.userId,
          Task.Schema.name,
          { completed }
        );

        let tasks = [];
        if (categoriesId && categoriesId.length > 0) {
          tasks = await Task.GetAllAsync(
            db,
            session.userId,
            limit,
            skip,
            completed,
            categoriesId
          );
        } else {
          tasks = await Task.GetAllByIdsAsync(
            db,
            session.userId,
            itemOrder.orderedIds.slice(skip, skip + limit)
          );
        }

        let orederedTasks = [];

        // Should be a 1 time run
        if (itemOrder === undefined || itemOrder === null) {
          const allTasks = await Task.GetAllAsync(
            db,
            session.userId,
            undefined,
            undefined,
            completed
          );
          await ItemOrder.InsertAsync(
            db,
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
        console.log("err", JSON.stringify(e));
        handleError(res, ApiErrors.ErrorReadTask(e), session.accessToken);
      }
    })
  )
);

// Insert Task

router.post("/", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      const { body } = req;
      const task = Task.CreateFromBodyRequest(body, session.userId);
      if (task === undefined) {
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
        const result = await Task.InsertAsync(db, task);
        if (result.insertedId !== undefined) {
          await ItemOrder.PrependIdAsync(
            db,
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
          handleError(res, ApiErrors.ErrorInsertTask(), session.accessToken);
        }
      } catch (err) {
        console.log("err", JSON.stringify(err));
        handleError(res, ApiErrors.ErrorInsertTask(err), session.accessToken);
      }
    })
  )
);

// Delete Task

router.delete("/:id", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      const { id } = req.params;
      if (id === undefined || id.toString() === "") {
        handleError(res, ApiErrors.InvalidTaskId(), 400, session.accessToken);
        return;
      }
      try {
        const task = await Task.GetAsync(db, session.userId, id);
        const result = await Task.DeleteAsync(db, session.userId, id);
        if (result.deletedCount >= 1) {
          if (task !== undefined) {
            await ItemOrder.RemoveIdAsync(
              db,
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
          handleError(res, ApiErrors.ErrorDeleteTask(), session.accessToken);
        }
      } catch (err) {
        console.log("err", JSON.stringify(err));
        handleError(res, ApiErrors.ErrorDeleteTask(err), session.accessToken);
      }
    })
  )
);

// Update Task

router.patch("/", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      const { body } = req;
      const { id, ...other } = body;
      if (id === undefined) {
        handleError(
          res,
          ApiErrors.InvalidTaskParameters(),
          400,
          session.accessToken
        );
        return;
      }
      try {
        const result = await Task.UpdateAsync(db, id, { ...other });
        if (!result !== undefined && result.ok === 1) {
          handleResponse(
            res,
            { ...Task.CreateFromDocument(result.value), ...other },
            session.accessToken
          );
        } else {
          handleError(res, ApiErrors.ErrorUpdateTask(), session.accessToken);
        }
      } catch (err) {
        console.log("err", JSON.stringify(err));
        handleError(res, ApiErrors.ErrorUpdateTask(err), session.accessToken);
      }
    })
  )
);

router.patch("/position", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      const { body } = req;
      const { task, nextId } = body;
      if (task === undefined) {
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
          db,
          session.userId,
          Task.Schema.name,
          { completed: task.completed },
          nextId,
          task.id
        );
        if (!result !== undefined && result.ok === 1) {
          handleResponse(res, {}, session.accessToken);
        } else {
          handleError(res, ApiErrors.ErrorUpdateTask(), session.accessToken);
        }
      } catch (err) {
        console.log("err", JSON.stringify(err));
        handleError(res, ApiErrors.ErrorUpdateTask(err), session.accessToken);
      }
    })
  )
);

module.exports = router;
