const { getSessionByToken, verifySession } = require("../utils/authUtils");
const database = require("../utils/database");
const { handleError } = require("../Handlers");
const { Unauthorized } = require("../ApiErrors");

async function needAuth(req, res, next) {
  const db = database.instance();
  try {
    const session = await getSessionByToken(db, req.get("x-token"));
    if (session === undefined || session === null) {
      return handleError(res, Unauthorized(), 401);
    }
    const sessionError = await verifySession(session);
    if (sessionError !== undefined) {
      return handleError(res, sessionError, 401);
    }

    return next(session);
  } catch (ex) {
    return handleError(res, Unauthorized(ex), 401);
  }
}

module.exports = needAuth;
