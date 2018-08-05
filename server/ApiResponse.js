const success = data => ({
  success: true,
  data,
  error: undefined,
});

const error = apiError => ({
  success: false,
  data: undefined,
  error: apiError,
});

module.exports = {
  success, error,
};
