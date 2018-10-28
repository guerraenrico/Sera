const { getSessionByTokenAndRefreshIfNeeded } = require('../utils/authUtils');
const { handleError } = require('../Handlers');
const {
  Unauthorized,
} = require('../ApiErrors');

const needAuth = async (db, req, res, next) => {
  try {
    const session = await getSessionByTokenAndRefreshIfNeeded(db, req.get('x-token'));
    if (session === undefined || session === null) {
      return handleError(res, Unauthorized(), 401);
    }
    return next(session);
  } catch (ex) {
    return handleError(res, Unauthorized(ex), 401);
  }
};

module.exports = needAuth;
