const { getSessionByToken, verifySession } = require("../utils/authUtils");
const { isNullOrUndefined } = require("../utils/common");
const ApiResponse = require("../ApiResponse");

const errorCodes = require("../constants/errorCodes");
const AuthorizationError = require("../error/AuthorizationError");
const BadRequestError = require("../error/BadRequestError");

const needAuth = async (req, res, next) => {
  try {
    const token = req.get("x-token");
    if (isNullOrUndefined(token) || token === "") {
      throw new BadRequestError(
        errorCodes.VALID_TOKEN_REQUIRED,
        "Invalid token"
      );
    }
    const session = await getSessionByToken(req.get("x-token"));
    const sessionError = await verifySession(session);
    if (!isNullOrUndefined(sessionError)) {
      throw sessionError;
    }
    res.locals.session = session;
    next();
  } catch (e) {
    if (e instanceof AuthorizationError) {
      res.status(e.httpCode).json(ApiResponse.error(e.errorCode, e.message));
      return;
    }
    if (e instanceof BadRequestError) {
      res.status(e.httpCode).json(ApiResponse.error(e.errorCode, e.message));
      return;
    }
    res.status(500).json(ApiResponse.error(errorCodes.UNKNOWN, e.message));
  }
};

module.exports = needAuth;
