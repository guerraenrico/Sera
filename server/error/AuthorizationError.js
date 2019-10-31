class AuthorizationError extends Error {
  constructor(errorCode, message, ...params) {
    super(params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthorizationError);
    }
    this.name = "AuthorizationError";
    this.errorCode = errorCode;
    this.message = message;
    this.httpCode = 401;
  }
}

module.exports = AuthorizationError;
