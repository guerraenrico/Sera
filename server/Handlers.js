const ApiResponse = require('./ApiResponse');

const handleError = (res, apiError, httpCode) => {
  res.status(httpCode || 500).json(ApiResponse.error(apiError));
};

const handleResponse = (res, data) => {
  res.status(200).json(ApiResponse.success(data));
};

module.exports = {
  handleError,
  handleResponse,
};
