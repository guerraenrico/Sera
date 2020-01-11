const { OAuth2Client } = require("google-auth-library");

const AuthorizationError = require("../error/AuthorizationError");

const errorCodes = require("../constants/errorCodes");
const User = require("../models/User");
const Session = require("../models/Session");
const { isNullOrUndefined } = require("../utils/common");

const client = new OAuth2Client(
  process.env.OAUTH2_CLIENT_ID_WEB,
  process.env.OAUTH2_CLIENT_SECRET_WEB,
  process.env.OAUTH2_REDIRECT_WEB
);

/**
 * Get user tokens from Google Auth Client
 * @param {String} code user's google code
 */
const getTokensAsync = async code => {
  try {
    const { tokens } = await client.getToken(code);
    return tokens;
  } catch (e) {
    throw new AuthorizationError(errorCodes.INVALID_AUTH_CODE, e.message);
  }
};

/**
 * Get payloads from Google Auth Client
 * @param {String} idToken usert token id
 */
const getPayload = async idToken => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: [
        // Clients id
        process.env.OAUTH2_CLIENT_ID_WEB
      ]
    });
    return ticket.getPayload();
  } catch (e) {
    throw new AuthorizationError(errorCodes.AUTH_INVALID_PAYLOAD, e.message);
  }
};

/**
 * Check id the payload is valid
 * @param {Object} payload user's google payload
 */
const isPayloadValid = payload => {
  if (isNullOrUndefined(payload)) {
    return false;
  }
  // Client id
  if (payload.aud !== process.env.OAUTH2_CLIENT_ID_WEB) {
    return false;
  }
  if (
    payload.iss !== "accounts.google.com" &&
    payload.iss !== "https://accounts.google.com"
  ) {
    return false;
  }
  return true;
};

/**
 * Check if the session is valid
 * Return null if is valid othrewise an AuthorizationError
 * @param {Object} session user session
 * @returns {AuthorizationError} error or null if valid
 */
const verifySession = async session => {
  if (isNullOrUndefined(session)) {
    throw new AuthorizationError(
      errorCodes.INVALID_SESSION_TOKEN,
      "Invalid session token"
    );
  }
  if (session.expireAt < new Date()) {
    throw new AuthorizationError(
      errorCodes.EXPIRED_SESSION,
      "Session expired. Please sign in"
    );
  }
  if (!(await client.getTokenInfo(session.accessToken))) {
    throw new AuthorizationError(
      errorCodes.UNAUTHORIZED,
      "Invalid session token"
    );
  }
  return null;
};

/**
 * Read user's session from datatabase
 * @param {String} accessToken user' access token
 */
const getSessionByToken = async accessToken => {
  const session = await Session.GetByAccessTokenAsync(accessToken);
  if (isNullOrUndefined(session)) {
    throw new AuthorizationError(
      errorCodes.INVALID_SESSION_TOKEN,
      "Invalid session token"
    );
  }
  return session;
};

/**
 * Read user's session from database and if expired a new
 * access token is created.
 * If no session is found or is invalid return undefined
 * @param {String} accessToken user's access token
 */
const getSessionByTokenAndRefreshIfNeeded = async accessToken => {
  let session = await getSessionByToken(accessToken);
  if (isNullOrUndefined(session)) {
    return undefined;
  }

  try {
    const sessionError = await verifySession(session);
    if (isNullOrUndefined(sessionError)) {
      return session;
    }
  } catch (e) {
    // Refresh only if the session is expired
    if (
      !(e instanceof AuthorizationError) &&
      e.httpCode !== errorCodes.EXPIRED_SESSION
    ) {
      throw e;
    }
  }

  const user = await User.GetAsync(session.userId);
  if (isNullOrUndefined(user)) {
    throw new AuthorizationError(
      errorCodes.USER_NOT_FOUND,
      "User deleted of invalid session"
    );
  }
  client.credentials.refresh_token = user.refreshToken;
  const res = await client.getAccessToken();
  const { token } = res;
  if (!token) {
    throw new AuthorizationError(
      errorCodes.INVALID_SESSION_TOKEN,
      "Invalid user refresh token"
    );
  }

  const tokenInfo = await client.getTokenInfo(token);

  session = {
    ...session,
    expireAt: new Date(tokenInfo.expiry_date),
    accessToken: token
  };

  const { result } = await Session.UpdateAsync(session);
  if (isNullOrUndefined(result) || result.ok !== 1) {
    throw new AuthorizationError(
      errorCodes.ERROR_UPDATE_SESSION,
      "Error while updating the session, try again"
    );
  }

  return session;
};

/**
 * Read the user from the database
 * @param {String} accessToken user's access token
 */
const getUserByToken = async accessToken => {
  // Verify token
  const session = await getSessionByToken(accessToken);

  const sessionError = await verifySession(session);
  if (!isNullOrUndefined(sessionError)) {
    throw sessionError;
  }

  // Verify user saved in the db
  const user = await User.GetAsync(session.userId);
  return { user, session };
};

const revokeSessionAndToken = async accessToken => {
  await Session.DeleteByAccessTokenAsync(accessToken);
};

module.exports = {
  getPayload,
  isPayloadValid,
  verifySession,
  getUserByToken,
  getTokensAsync,
  getSessionByToken,
  getSessionByTokenAndRefreshIfNeeded,
  revokeSessionAndToken
};
