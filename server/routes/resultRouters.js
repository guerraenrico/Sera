const express = require("express");

const needAuth = require("../middleware/authMiddleware");
const { catchErrors, errorHandler } = require("../middleware//errorMiddleware");

const errorCodes = require("../constants/errorCodes");
const Result = require("../models/Result");
const ApiError = require("../error/ApiError");
const ApiResponse = require("../ApiResponse");

const router = express.Router();

router.get(
  "/",
  needAuth,
  catchErrors(async (req, res) => {
    const { timeInterval } = req.query;
    const { session } = res.locals;
    try {
      const taskResults = await Result.GetTaskResults({
        userId: session.userId,
        timeInterval
      });
      res.status(200).json(ApiResponse.success({ tasks: taskResults }));
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_READ_TASK_RESULTS, e.message);
    }
  })
);

router.use(errorHandler);

module.exports = router;
