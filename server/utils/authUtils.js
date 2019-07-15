const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");
const Session = require("../models/Session");
const { isNullOrUndefined } = require("../utils/common");

const {
  Unauthorized,
  ExpiredSession,
  isErrorExpiredSession
} = require("../ApiErrors");

const client = new OAuth2Client(
  process.env.OAUTH2_CLIENT_ID_WEB,
  process.env.OAUTH2_CLIENT_SECRET_WEB,
  process.env.OAUTH2_REDIRECT_WEB
);

/**
 * Get user tokens from Google Auth Client
 * @param {String} code user's google code
 */
const getTokens = code => client.getToken(code);

/**
 * Get payloads from Google Auth Client
 * @param {String} idToken usert token id
 */
const getPayload = async idToken => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: [
      // Clients id
      process.env.OAUTH2_CLIENT_ID_WEB
    ]
  });
  return ticket.getPayload();
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
 * Return undefined if is valid othrewise an {Object} Error
 * @param {Object} session user session
 */
const verifySession = async session => {
  if (isNullOrUndefined(session)) {
    return Unauthorized();
  }
  if (session.expireAt < new Date()) {
    return ExpiredSession();
  }
  if (!(await client.getTokenInfo(session.accessToken))) {
    return Unauthorized();
  }
  return undefined;
};

/**
 * Read user's session from datatabase
 * @param {String} accessToken user' access token
 */
const getSessionByToken = async accessToken => {
  const session = await Session.GetByAccessTokenAsync(accessToken);
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

  const sessionError = await verifySession(session);
  if (isNullOrUndefined(sessionError)) {
    return session;
  }
  // Refresh only if the session is expired
  if (!isErrorExpiredSession(sessionError)) {
    return undefined;
  }

  const user = await User.GetAsync(session.userId);
  if (isNullOrUndefined(user)) {
    return undefined;
  }
  client.credentials.refresh_token = user.refreshToken;
  const res = await client.getAccessToken();
  const { token } = res;
  if (!token) {
    return undefined;
  }

  const tokenInfo = await client.getTokenInfo(token);

  session = {
    ...session,
    expireAt: new Date(tokenInfo.expiry_date),
    accessToken: token
  };

  const { result } = await Session.UpdateAsync(session);
  if (isNullOrUndefined(result) || result.ok !== 1) {
    return undefined;
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
    return sessionError;
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
  getTokens,
  getSessionByToken,
  getSessionByTokenAndRefreshIfNeeded,
  revokeSessionAndToken
};
