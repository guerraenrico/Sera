/* eslint no-unused-vars: ["error", { "args": "none" }] */

const errorCodes = require("../constants/errorCodes");
const ApiResponse = require("../ApiResponse");
const ApiError = require("../error/ApiError");
const AuthorizationError = require("../error/AuthorizationError");
const BadRequestError = require("../error/BadRequestError");

const catchErrors = fn => (...args) => fn(...args).catch(args[2]);

function errorHandler(err, req, res, next) {
  console.error("ERROR: ", err);
  if (err instanceof ApiError) {
    res
      .status(err.httpCode)
      .json(ApiResponse.error(err.errorCode, err.message));
    return;
  }
  if (err instanceof AuthorizationError) {
    res
      .status(err.httpCode)
      .json(ApiResponse.error(err.errorCode, err.message));
    return;
  }
  if (err instanceof BadRequestError) {
    res
      .status(err.httpCode)
      .json(ApiResponse.error(err.errorCode, err.message));
    return;
  }
  res.status(500).json(ApiResponse.error(errorCodes.UNKNOWN, err.message));
}

module.exports = {
  catchErrors,
  errorHandler
};
