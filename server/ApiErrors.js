const getError = (code, internalError, message) => ({
  code,
  internalError,
  message,
});

const ErrorReadCategory = (error = undefined) => getError(1001, error, 'Error read Category');
const ErrorInsertCategory = (error = undefined) => getError(1002, error, 'Error insert Category');
const ErrorDeleteCategory = (error = undefined) => getError(1003, error, 'Error delete category');

const InvalidCategoryParameters = (error = undefined) => getError(2001, error, 'Invalid category parameters');
const InvalidCategoryId = (error = undefined) => getError(2002, error, 'Invalid category id');

module.exports = {
  ErrorReadCategory,
  ErrorInsertCategory,
  InvalidCategoryParameters,
  InvalidCategoryId,
  ErrorDeleteCategory,
};
