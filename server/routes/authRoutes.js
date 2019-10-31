const express = require("express");

const User = require("../models/User");
const Session = require("../models/Session");

const { catchErrors, errorHandler } = require("../middleware/errorMiddleware");

const errorCodes = require("../constants/errorCodes");
const ApiResponse = require("../ApiResponse");
const AuthorizationError = require("../error/AuthorizationError");
const BadRequestError = require("../error/BadRequestError");

const {
  getPayload,
  isPayloadValid,
  getUserByToken,
  getTokensAsync,
  revokeSessionAndToken,
  getSessionByTokenAndRefreshIfNeeded
} = require("../utils/authUtils");
const { isNullOrUndefined } = require("../utils/common");

const router = express.Router();

router.post(
  "/google/signin/callback",
  catchErrors(async (req, res) => {
    const { code, platform } = req.body;

    if (isNullOrUndefined(code) || code === "") {
      throw new BadRequestError(
        errorCodes.INVALID_AUTH_CODE,
        "Invalid or missing code"
      );
    }

    const tokens = await getTokensAsync(code);

    const idToken = tokens.id_token;
    const refreshToken = tokens.refresh_token;
    const accessToken = tokens.access_token;
    const expireAt = new Date(tokens.expiry_date);

    const payload = await getPayload(idToken);
    if (!isPayloadValid(payload)) {
      throw new AuthorizationError(
        errorCodes.isPayloadValid,
        "Invalid payload from token"
      );
    }

    const user = User.New({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      locale: payload.locale,
      pictureUrl: payload.picture,
      refreshToken
    });

    const savedUser = await User.GetByGoogleIdAsync(user.googleId);
    if (isNullOrUndefined(savedUser)) {
      // Save user if not exists in the db
      const result = await User.InsertAsync(user);
      if (isNullOrUndefined(result.insertedId)) {
        throw new AuthorizationError(
          errorCodes.ERROR_CREATE_USER,
          "Cannot create user, retry"
        );
      }
      user.id = result.insertedId;
    } else {
      user.id = savedUser.id;
    }
    // Clear refresh token
    user.refreshToken = undefined;

    const savedSession = await Session.GetByAccessTokenAsync(accessToken);
    if (isNullOrUndefined(savedSession)) {
      const session = Session.New({
        userId: user.id.valueOf().toString(),
        accessToken,
        platform,
        expireAt
      });
      const result = await Session.InsertAsync(session);
      if (isNullOrUndefined(result.insertedId)) {
        throw new AuthorizationError(
          errorCodes.ERROR_CREATE_SESSION,
          "Cannot create session, retry"
        );
      }
    }
    res.status(200).json(ApiResponse.success({ user, accessToken }));
  })
);

router.post(
  "/google/validate/token",
  catchErrors(async (req, res) => {
    const { accessToken } = req.body;
    const result = await getUserByToken(accessToken);

    const { user, session } = result;
    // Clear refresh token
    user.refreshToken = undefined;

    if (isNullOrUndefined(user) || isNullOrUndefined(session)) {
      throw new AuthorizationError(
        errorCodes.UNAUTHORIZED,
        "User unauthorized, sign in again"
      );
    }
    res
      .status(200)
      .json(ApiResponse.success({ user, accessToken: session.accessToken }));
  })
);

router.post(
  "/google/logout",
  catchErrors(async (req, res) => {
    const { accessToken } = req.body;
    await revokeSessionAndToken(accessToken);
    res.status(200);
  })
);

router.post(
  "/google/refresh/token",
  catchErrors(async (req, res) => {
    const { accessToken } = req.body;
    const newSession = await getSessionByTokenAndRefreshIfNeeded(accessToken);
    if (isNullOrUndefined(newSession)) {
      throw new AuthorizationError(
        errorCodes.INVALID_SESSION_TOKEN,
        "Cannot refresh token, sign in again"
      );
    }
    res.status(200).json(ApiResponse.success(newSession));
  })
);

router.use(errorHandler);

module.exports = router;
