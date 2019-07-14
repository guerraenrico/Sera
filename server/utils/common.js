const isNullOrUndefined = value => value === undefined || value === null;

const isEmptyObject = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

module.exports = {
  isNullOrUndefined,
  isEmptyObject
};
