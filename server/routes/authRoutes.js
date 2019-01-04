const express = require('express');
const { MongoClient } = require('mongodb');

const { dbName, dbUrl } = require('../constants/dbConstants');
const User = require('../models/User');
const Session = require('../models/Session');
const { handleError, handleResponse } = require('../Handlers');
const {
  ErrorAuthInvalidPayload, ErrorCreateUser,
  ErrorCreateSession, ErrorAuthInvalidCode, Unauthorized, InvalidAuthCode,
} = require('../ApiErrors');
const {
  getPayload, isPayloadValid,
  getUserByToken, getTokens, revokeSessionAndToken,
  getSessionByTokenAndRefreshIfNeeded,
} = require('../utils/authUtils');

const router = express.Router();

router.post('/google/signin/callback', async (req, res) => {
  const conn = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  const db = conn.db(dbName);
  const { code, platform } = req.body;
  let tokens;
  let payload;

  if (code === undefined || code === '') {
    handleError(res, InvalidAuthCode(), 401);
    return;
  }

  try {
    ({ tokens } = await getTokens(code));
  } catch (err) {
    handleError(res, ErrorAuthInvalidCode(err), 401);
    return;
  }

  const idToken = tokens.id_token;
  const refreshToken = tokens.refresh_token;
  const accessToken = tokens.access_token;
  const expireAt = new Date(tokens.expiry_date);

  try {
    payload = await getPayload(idToken);
    if (!isPayloadValid(payload)) {
      handleError(res, ErrorAuthInvalidPayload(), 401);
      return;
    }
  } catch (ex) {
    handleError(res, ErrorAuthInvalidPayload(ex), 401);
    return;
  }

  const user = User.New(payload.sub,
    payload.email, payload.name, payload.locale, payload.picture,
    refreshToken);

  try {
    const savedUser = await User.GetByGoogleIdAsync(db, user.googleId);
    if (savedUser === undefined) {
      // Save user if not exists in the db
      const result = await User.InsertAsync(db, user);
      if (result.insertedId === undefined) {
        handleError(res, ErrorCreateUser(), 500);
        return;
      }
      user.id = result.insertedId;
    } else {
      user.id = savedUser.id;
    }
  } catch (ex) {
    handleError(res, ErrorCreateUser(ex), 500);
    return;
  }
  // Clear refresh token
  user.refreshToken = undefined;

  try {
    const savedSession = await Session.GetByAccessTokenAsync(db, accessToken);
    if (savedSession === undefined) {
      const session = Session.New(
        user.id.valueOf().toString(),
        accessToken, platform, expireAt,
      );
      await Session.InsertAsync(db, session);
    }
  } catch (ex) {
    handleError(res, ErrorCreateSession(ex), 500);
    return;
  }

  handleResponse(res, user, accessToken);
  conn.close();
});

router.post('/google/validate/token', async (req, res) => {
  const conn = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  const db = conn.db(dbName);
  const { accessToken } = req.body;
  try {
    const result = await getUserByToken(db, accessToken);
    // Check if return error
    if (result.code !== undefined) {
      console.log('(Validate) ERROR: ', `result: ${JSON.stringify(result)}`);
      handleError(res, result, 401);
      return;
    }
    const { user, session } = result;
    // Clear refresh token
    user.refreshToken = undefined;

    if (user === undefined || user === null || session === undefined || session === null) {
      handleError(res, Unauthorized(), 401);
      console.log('(Validate) ERROR: ', `user: ${JSON.stringify(user)} - session: ${JSON.stringify(session)}`);
      return;
    }
    handleResponse(res, user, session.accessToken);
  } catch (ex) {
    console.log('(Validate) ERROR: ', `ex: ${JSON.stringify(ex)}`);
    handleError(res, Unauthorized(ex), 401);
  } finally {
    conn.close();
  }
});

router.post('/google/logout', async (req, res) => {
  const conn = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  const db = conn.db(dbName);
  const { accessToken } = req.body;
  try {
    await revokeSessionAndToken(db, accessToken);
    handleResponse(res);
  } catch (ex) {
    handleError(res, Unauthorized(ex), 401);
  } finally {
    conn.close();
  }
});

router.post('/google/refresh/token', async (req, res) => {
  const conn = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  const db = conn.db(dbName);
  const { accessToken } = req.body;
  try {
    const newSession = await getSessionByTokenAndRefreshIfNeeded(db, accessToken);
    if (newSession === undefined) {
      console.log('(Refresh) ERROR: ', `newSession: ${JSON.stringify(newSession)}`);
      handleError(res, Unauthorized(), 401);
      return;
    }
    handleResponse(res, newSession, newSession.accessToken);
  } catch (ex) {
    console.log('(Refresh) ERROR: ', `ex: ${JSON.stringify(ex)}`);
    handleError(res, Unauthorized(ex), 401);
  } finally {
    conn.close();
  }
});

module.exports = router;
