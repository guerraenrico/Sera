const { OAuth2Client } = require('google-auth-library');

const User = require('../models/User');
const Session = require('../models/Session');

const client = new OAuth2Client(
  process.env.OAUTH2_CLIENT_ID_WEB,
  process.env.OAUTH2_CLIENT_SECRET_WEB,
  process.env.OAUTH2_REDIRECT_WEB,
);

const getTokens = code => client.getToken(code);

const getPayload = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: [
      // Clients id
      process.env.OAUTH2_CLIENT_ID_WEB,
    ],
  });
  return ticket.getPayload();
};

const isPayloadValid = (payload) => {
  if (payload === undefined) {
    return false;
  }
  // Client id
  if (payload.aud !== process.env.OAUTH2_CLIENT_ID_WEB) {
    return false;
  }
  if (payload.iss !== 'accounts.google.com' && payload.iss !== 'https://accounts.google.com') {
    return false;
  }
  return true;
};

const getSessionByTokenAndRefreshIfNeeded = async (db, accessToken) => {
  let session = await Session.GetByAccessTokenAsync(db, accessToken);
  if (session === undefined) {
    return undefined;
  }

  if (session.expireAt > (new Date())) {
    if (await client.getTokenInfo(session.accessToken)) {
      return session;
    }
  }

  const user = await User.GetAsync(db, session.userId);
  if (user === undefined) {
    return undefined;
  }
  client.credentials.refresh_token = user.refreshToken;
  const { token } = await client.getAccessToken();
  if (!token) {
    return undefined;
  }

  const tokenInfo = await client.getTokenInfo(token);

  session = {
    ...session,
    expireAt: new Date(tokenInfo.expiry_date),
    accessToken: token,
  };

  const { result } = await Session.UpdateAsync(db, session);
  if (result === undefined || result.ok !== 1) {
    return undefined;
  }

  return session;
};

const getUserByToken = async (db, accessToken) => {
  // Verify token saved in the db and refresh if expired
  const session = await getSessionByTokenAndRefreshIfNeeded(db, accessToken);
  if (session === undefined) {
    return undefined;
  }
  // Verify user saved in the db
  const user = await User.GetAsync(db, session.userId);
  return { user, session };
};

const revokeSessionAndToken = async (db, accessToken) => {
  await Session.DeleteByAccessTokenAsync(db, accessToken);
  // await client.revokeToken(accessToken);
};

module.exports = {
  getPayload,
  isPayloadValid,
  getUserByToken,
  getTokens,
  getSessionByTokenAndRefreshIfNeeded,
  revokeSessionAndToken,
};
