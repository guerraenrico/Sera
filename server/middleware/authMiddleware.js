const { getSessionByToken, verifySession } = require('../utils/authUtils');
const { handleError } = require('../Handlers');
const {
  Unauthorized,
} = require('../ApiErrors');

const needAuth = async (db, req, res, next) => {
  try {
    const session = await getSessionByToken(db, req.get('x-token'));
    if (session === undefined || session === null) {
      return handleError(res, Unauthorized(), 401);
    }
    const sessionError = verifySession(session);
    if (sessionError !== undefined) {
      return handleError(res, sessionError, 401);
    }

    return next(session);
  } catch (ex) {
    return handleError(res, Unauthorized(ex), 401);
  }
};

module.exports = needAuth;
