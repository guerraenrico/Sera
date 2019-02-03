const success = (data, accessToken) => ({
  success: true,
  data,
  error: undefined,
  accessToken
});

const error = (apiError, accessToken) => ({
  success: false,
  data: undefined,
  error: apiError,
  accessToken
});

module.exports = {
  success,
  error
};
