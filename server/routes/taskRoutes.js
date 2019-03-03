const express = require("express");

const connection = require("../middleware/dbConnectionMiddleware");
const needAuth = require("../middleware/authMiddleware");

const Task = require("../models/Task");
const ApiErrors = require("../ApiErrors");
const { handleError, handleResponse } = require("../Handlers");

const router = express.Router();

// Get Tasks

router.get("/", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      const limit =
        req.query.limit !== undefined && parseInt(req.query.limit, 10);
      const skip = req.query.skip !== undefined && parseInt(req.query.skip, 10);
      const completed = req.query.completed === "true";
      const categoriesId =
        req.query.categoriesId !== undefined &&
        req.query.categoriesId.split(",");
      try {
        const tasks = await Task.GetAllAsync(
          db,
          session.userId,
          limit,
          skip,
          completed,
          categoriesId
        );
        handleResponse(res, tasks, session.accessToken);
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
        const result = await Task.InsertAsync(db, task);
        if (result.insertedId !== undefined) {
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
        const result = await Task.DeleteAsync(db, session.userId, id);
        if (result.deletedCount >= 1) {
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

module.exports = router;
