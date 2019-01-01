const ErrorCodes = require('./constants/errorCodes');

const getError = (code, internalError, message = '') => ({
  code,
  internalError,
  message,
});

const Unauthorized = () => getError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', 'Invalid token');
const ExpiredSession = () => getError(ErrorCodes.EXPIRED_SESSION, 'ExpiredSession', 'Expired session');

const ErrorAuthInvalidPayload = () => getError(ErrorCodes.AUTH_INVALID_PAYLOAD, 'Invalid payload', 'Something is wrong with your payload. Please retry!');
const ErrorAuthInvalidCode = () => getError(ErrorCodes.INVALID_AUTH_CODE, 'Invalid code', 'Something is wrong with your code. Please retry!');
const ErrorCreateUser = () => getError(ErrorCodes.ERROR_CREATE_USER, 'Error creating you user', 'Something went wrong while creating your account');
const ErrorCreateSession = () => getError(ErrorCodes.ERROR_CREATE_SESSION, 'Error creating you session', 'Error while creating your session');
const ErrorAuthUnknown = () => getError(ErrorCodes.AUTH_ERROR_UNKNOWN, 'Error auth unknown', 'What\'s happening?');

const ErrorReadCategory = () => getError(ErrorCodes.ERROR_READ_CATEGORY, 'Error read Category', 'Error while reading your category');
const ErrorInsertCategory = () => getError(ErrorCodes.ERROR_INSERT_CATEGORY, 'Error insert Category', 'Error creating the category');
const ErrorDeleteCategory = () => getError(ErrorCodes.ERROR_DELETE_CATEGORY, 'Error delete category', 'Error deleting your category');
const ErrorReadTask = () => getError(ErrorCodes.ERROR_READ_TASK, 'Error read Task', 'Error while reading your tasks');
const ErrorInsertTask = () => getError(ErrorCodes.ERROR_INSERT_TASK, 'Error insert Task', 'Error creating the task');
const ErrorDeleteTask = () => getError(ErrorCodes.ERROR_DELETE_TASK, 'Error delete Task', 'Error deleting the task');
const ErrorUpdateTask = () => getError(ErrorCodes.ERROR_UPDATE_TASK, 'Error update Task', 'Error updating the task');

const InvalidAuthCode = () => getError(ErrorCodes.AUTH_INVALID_CODE, 'Parameter code non provided', 'Invalid request. You can do nothing about it');
const InvalidCategoryParameters = () => getError(ErrorCodes.INVALID_CATEGORY_PARAMETERS, 'Invalid category parameters', 'Invalid request. You can do nothing about it');
const InvalidCategoryId = () => getError(ErrorCodes.INVALID_CATEGORY_ID, 'Invalid category id', 'Invalid request. You can do nothing about it');
const InvalidTaskParameters = () => getError(ErrorCodes.INVALID_TASK_PARAMETERS, 'Invalid task parameters', 'Invalid request. You can do nothing about it');
const InvalidTaskId = () => getError(ErrorCodes.INVALID_TASK_ID, 'Invalid task id', 'Invalid request. You can do nothing about it');

const isErrorExpiredSession = error => error !== undefined
  && error.code === ErrorCodes.EXPIRED_SESSION;

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
};
