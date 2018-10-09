const getError = (code, internalError, message = '') => ({
  code,
  internalError,
  message,
});

const Unauthorized = () => getError(800, 'Unauthorized', 'Invalid token');

const ErrorAuthInvalidPayload = () => getError(900, 'Invalid payload', 'Something is wrong with your payload. Please retry!');
const ErrorAuthInvalidCode = () => getError(901, 'Invalid code', 'Something is wrong with your code. Please retry!');
const ErrorCreateUser = () => getError(940, 'Error creating you user', 'Something went wrong while creating your account');
const ErrorCreateSession = () => getError(950, 'Error creating you session', 'Error while creating your session');
const ErrorAuthUnknown = () => getError(999, 'Error auth unknown', 'What\'s happening?');

const ErrorReadCategory = () => getError(1001, 'Error read Category', 'Error while reading your category');
const ErrorInsertCategory = () => getError(1002, 'Error insert Category', 'Error creating the category');
const ErrorDeleteCategory = () => getError(1003, 'Error delete category', 'Error deleting your category');
const ErrorReadTask = () => getError(1004, 'Error read Task', 'Error while reading your tasks');
const ErrorInsertTask = () => getError(1005, 'Error insert Task', 'Error creating the task');
const ErrorDeleteTask = () => getError(1006, 'Error delete Task', 'Error deleting the task');
const ErrorUpdateTask = () => getError(1007, 'Error update Task', 'Error updating the task');

const InvalidAuthCode = () => getError(1900, 'Parameter code non provided', 'Invalid request. You can do nothing about it');
const InvalidCategoryParameters = () => getError(2001, 'Invalid category parameters', 'Invalid request. You can do nothing about it');
const InvalidCategoryId = () => getError(2002, 'Invalid category id', 'Invalid request. You can do nothing about it');
const InvalidTaskParameters = () => getError(2001, 'Invalid task parameters', 'Invalid request. You can do nothing about it');
const InvalidTaskId = () => getError(2002, 'Invalid task id', 'Invalid request. You can do nothing about it');

module.exports = {
  Unauthorized,
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
};
