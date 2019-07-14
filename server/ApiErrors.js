const ErrorCodes = require("./constants/errorCodes");
const { isNullOrUndefined } = require("./utils/common");

const getError = (code, internalError, message = "") => ({
  code,
  internalError,
  message
});

const Unauthorized = e =>
  getError(
    ErrorCodes.UNAUTHORIZED,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Invalid token"
  );
const ExpiredSession = e =>
  getError(
    ErrorCodes.EXPIRED_SESSION,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Expired session"
  );

const ErrorAuthInvalidPayload = e =>
  getError(
    ErrorCodes.AUTH_INVALID_PAYLOAD,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Something is wrong with your payload. Please retry!"
  );
const ErrorAuthInvalidCode = e =>
  getError(
    ErrorCodes.INVALID_AUTH_CODE,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Something is wrong with your code. Please retry!"
  );
const ErrorCreateUser = e =>
  getError(
    ErrorCodes.ERROR_CREATE_USER,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Something went wrong while creating your account"
  );
const ErrorCreateSession = e =>
  getError(
    ErrorCodes.ERROR_CREATE_SESSION,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Error while creating your session"
  );
const ErrorAuthUnknown = e =>
  getError(
    ErrorCodes.AUTH_ERROR_UNKNOWN,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "What's happening?"
  );

const ErrorReadCategory = e =>
  getError(
    ErrorCodes.ERROR_READ_CATEGORY,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Error while reading your category"
  );
const ErrorInsertCategory = e =>
  getError(
    ErrorCodes.ERROR_INSERT_CATEGORY,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Error creating the category"
  );
const ErrorDeleteCategory = e =>
  getError(
    ErrorCodes.ERROR_DELETE_CATEGORY,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Error deleting your category"
  );
const ErrorReadTask = e =>
  getError(
    ErrorCodes.ERROR_READ_TASK,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Error while reading your tasks"
  );
const ErrorInsertTask = e =>
  getError(
    ErrorCodes.ERROR_INSERT_TASK,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Error creating the task"
  );
const ErrorDeleteTask = e =>
  getError(
    ErrorCodes.ERROR_DELETE_TASK,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Error deleting the task"
  );
const ErrorUpdateTask = e =>
  getError(
    ErrorCodes.ERROR_UPDATE_TASK,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Error updating the task"
  );

const ErrorReadTaskResults = e =>
  getError(
    ErrorCodes.ERROR_READ_TASK_RESULTS,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Error while reading your tasks result"
  );

const InvalidAuthCode = e =>
  getError(
    ErrorCodes.AUTH_INVALID_CODE,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Invalid request. You can do nothing about it"
  );
const InvalidCategoryParameters = e =>
  getError(
    ErrorCodes.INVALID_CATEGORY_PARAMETERS,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Invalid request. You can do nothing about it"
  );
const InvalidCategoryId = e =>
  getError(
    ErrorCodes.INVALID_CATEGORY_ID,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Invalid request. You can do nothing about it"
  );
const InvalidTaskParameters = e =>
  getError(
    ErrorCodes.INVALID_TASK_PARAMETERS,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Invalid request. You can do nothing about it"
  );
const InvalidTaskId = e =>
  getError(
    ErrorCodes.INVALID_TASK_ID,
    isNullOrUndefined(e) ? "Undefined error" : e.message,
    "Invalid request. You can do nothing about it"
  );

const isErrorExpiredSession = error =>
  error !== undefined && error.code === ErrorCodes.EXPIRED_SESSION;

module.exports = {
  Unauthorized,
  ExpiredSession,
  ErrorAuthInvalidPayload,
  ErrorAuthInvalidCode,
  ErrorCreateUser,
  ErrorCreateSession,
  ErrorAuthUnknown,
  ErrorReadCategory,
  ErrorInsertCategory,
  ErrorDeleteCategory,
  ErrorReadTask,
  ErrorInsertTask,
  ErrorDeleteTask,
  ErrorUpdateTask,
  InvalidAuthCode,
  InvalidCategoryParameters,
  InvalidCategoryId,
  InvalidTaskParameters,
  InvalidTaskId,
  isErrorExpiredSession,
  ErrorReadTaskResults
};
