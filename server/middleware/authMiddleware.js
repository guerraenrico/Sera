const { getSessionByToken, verifySession } = require("../utils/authUtils");
const { isNullOrUndefined } = require("../utils/common");
const { handleError } = require("../Handlers");
const { Unauthorized } = require("../ApiErrors");

async function needAuth(req, res, next) {
  try {
    const session = await getSessionByToken(req.get("x-token"));
    if (isNullOrUndefined(session)) {
      return handleError(res, Unauthorized(), 401);
    }
    const sessionError = await verifySession(session);
    if (!isNullOrUndefined(sessionError)) {
      return handleError(res, sessionError, 401);
    }

    return next(session);
  } catch (ex) {
    return handleError(res, Unauthorized(ex), 401);
  }
}

module.exports = needAuth;
