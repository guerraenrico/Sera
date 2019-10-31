class ApiError extends Error {
  constructor(errorCode, message, ...params) {
    super(params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";
    this.errorCode = errorCode;
    this.message = message;
    this.httpCode = 500;
  }
}

module.exports = ApiError;
