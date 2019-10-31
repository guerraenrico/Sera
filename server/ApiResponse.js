const success = data => ({
  success: true,
  data,
  error: undefined
});

const error = (errorCode, message) => ({
  success: false,
  data: undefined,
  error: {
    code: errorCode,
    message
  }
});

module.exports = {
  success,
  error
};
