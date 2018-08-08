const getError = (code, internalError, message) => ({
  code,
  internalError,
  message,
});

const ErrorReadCategory = (error = undefined) => getError(1001, error, 'Error read Category');
const ErrorInsertCategory = (error = undefined) => getError(1002, error, 'Error insert Category');
const ErrorDeleteCategory = (error = undefined) => getError(1003, error, 'Error delete category');
const ErrorReadTask = (error = undefined) => getError(1004, error, 'Error read Task');
const ErrorInsertTask = (error = undefined) => getError(1005, error, 'Error insert Task');
const ErrorDeleteTask = (error = undefined) => getError(1006, error, 'Error delete Task');
const ErrorUpdateTask = (error = undefined) => getError(1007, error, 'Error update Task');

const InvalidCategoryParameters = (error = undefined) => getError(2001, error, 'Invalid category parameters');
const InvalidCategoryId = (error = undefined) => getError(2002, error, 'Invalid category id');
const InvalidTaskParameters = (error = undefined) => getError(2001, error, 'Invalid task parameters');
const InvalidTaskId = (error = undefined) => getError(2002, error, 'Invalid task id');

module.exports = {
  ErrorReadCategory,
  ErrorInsertCategory,
  ErrorDeleteCategory,
  ErrorReadTask,
  ErrorInsertTask,
  ErrorDeleteTask,
  ErrorUpdateTask,
  InvalidCategoryParameters,
  InvalidCategoryId,
  InvalidTaskParameters,
  InvalidTaskId,
};
