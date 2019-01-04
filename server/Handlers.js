const ApiResponse = require('./ApiResponse');

const handleError = (res, apiError, httpCode, accessToken = '') => {
  console.log('ERROR: ', `apiError: ${JSON.stringify(apiError)} - httpCode: ${httpCode}`);
  res.status(httpCode || 500).json(ApiResponse.error(apiError, accessToken));
};

const handleResponse = (res, data, accessToken = '') => {
  res.status(200).json(ApiResponse.success(data, accessToken));
};

module.exports = {
  handleError,
  handleResponse,
};
