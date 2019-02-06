// @flow

import {
  FETCHING_AUTHENTICATION,
  RECEIVE_AUTHENTICATION,
  CLEAR_AUTHENTICATION,
  REFRESH_ACCESS_TOKEN
} from "../constants/actionTypes";
import { callApi, Methods } from "../utils/ApiUtils";
import * as store from "../utils/StoreUtils";
import { showMessageError } from "./messageActions";
import { shouldRefreshToken } from "../utils/RequestUtils";

const platform = "web";

const fetchingAuthentication = (): { type: string } => ({
  type: FETCHING_AUTHENTICATION
});

const receiveAuthentication = (
  user,
  accessToken: string
): { type: string } => ({
  type: RECEIVE_AUTHENTICATION,
  user,
  accessToken
});

export const clearAuthentication = () => (dispatch: ({}) => void) => {
  store.removeAccessToken();
  dispatch({
    type: CLEAR_AUTHENTICATION
  });
};

export const refreshAccessToken = () => async (dispatch: ({}) => void) => {
  try {
    const accessToken = store.getAccessToken();
    const response = await callApi(
      "auth/google/refresh/token",
      { accessToken, platform },
      Methods.POST
    );
    if (response.success) {
      if (accessToken === response.data.accessToken) {
        return;
      }
      store.saveAccessToken(response.data.accessToken);
      dispatch({
        type: REFRESH_ACCESS_TOKEN,
        accessToken: response.data.accessToken
      });
    } else {
      dispatch(clearAuthentication());
    }
  } catch (err) {
    dispatch(clearAuthentication());
  }
};

export const authenticateGoogleToken = (code: string) => async (
  dispatch: ({}) => void
) => {
  try {
    const response = await callApi(
      "auth/google/signin/callback",
      { code, platform },
      Methods.POST
    );
    if (response.success) {
      store.saveAccessToken(response.accessToken);
      dispatch(receiveAuthentication(response.data, response.accessToken));
    } else {
      dispatch(showMessageError(response.error.message));
    }
  } catch (err) {
    dispatch(showMessageError(err.message));
  }
};

export const validateToken = (accessToken: string) => async (
  dispatch: ({}) => void,
  getState: () => { auth: { accessToken: string } }
) => {
  try {
    const response = await callApi(
      "auth/google/validate/token",
      { accessToken, platform },
      Methods.POST
    );
    if (response.success) {
      store.saveAccessToken(response.accessToken);
      dispatch(receiveAuthentication(response.data, response.accessToken));
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        const newAccessToken = getState().auth.accessToken;
        dispatch(validateToken(newAccessToken));
        return;
      }
      dispatch(clearAuthentication());
    }
  } catch (err) {
    dispatch(clearAuthentication());
  }
};

export const logout = () => async (
  dispatch: ({}) => void,
  getState: () => { auth: { accessToken: string } }
) => {
  try {
    const { accessToken } = getState().auth;
    await callApi(
      "auth/google/logout",
      { accessToken, platform },
      Methods.POST
    );
  } finally {
    dispatch(clearAuthentication());
  }
};

export const initAuth = () => (dispatch: ({}) => void) => {
  dispatch(fetchingAuthentication());
  const accessToken = store.getAccessToken();

  if (accessToken === undefined || accessToken === "") {
    return dispatch(clearAuthentication());
  }
  return dispatch(validateToken(accessToken));
};
