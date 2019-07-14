const express = require("express");

const needAuth = require("../middleware/authMiddleware");

const Result = require("../models/Result");
const ApiErrors = require("../ApiErrors");
const { handleError, handleResponse } = require("../Handlers");

const router = express.Router();

router.get("/", (req, res) =>
  needAuth(req, res, async session => {
    const { timeInterval } = req.query;
    try {
      const taskResults = await Result.GetTaskResults({
        userId: session.userId,
        timeInterval
      });

      handleResponse(res, { tasks: taskResults }, session.accessToken);
    } catch (e) {
      console.log("err", e.message);
      handleError(
        res,
        ApiErrors.ErrorReadTaskResults(e),
        500,
        session.accessToken
      );
    }
  })
);

module.exports = router;
