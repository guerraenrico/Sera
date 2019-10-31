class BadRequestError extends Error {
  constructor(errorCode, message, ...params) {
    super(params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
    this.name = "BadRequestError";
    this.errorCode = errorCode;
    this.message = message;
    this.httpCode = 400;
  }
}

module.exports = BadRequestError;
