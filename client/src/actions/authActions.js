import { callApi, Methods } from "../utils/ApiUtils";
import * as store from "../utils/StoreUtils";
import { showMessageError } from "./messageActions";
import { shouldRefreshToken } from "../utils/RequestUtils";

const platform = "web";

export const enterAsGuest = () => ({
  type: "ENTER_AS_GUEST"
});

const fetchingAuthentication = () => ({
  type: "FETCHING_AUTHENTICATION"
});

const receiveAuthentication = (user, accessToken) => ({
  type: "RECEIVE_AUTHENTICATION",
  user,
  accessToken
});

export const clearAuthentication = () => dispatch => {
  store.removeAccessToken();
  dispatch({
    type: "CLEAR_AUTHENTICATION"
  });
};

export const refreshAccessToken = () => async dispatch => {
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
        type: "REFRESH_ACCESS_TOKEN",
        accessToken: response.data.accessToken
      });
    } else {
      dispatch(clearAuthentication());
    }
  } catch (err) {
    dispatch(clearAuthentication());
  }
};

export const authenticateGoogleToken = code => async dispatch => {
  try {
    const response = await callApi(
      "auth/google/signin/callback",
      { code, platform },
      Methods.POST
    );
    if (response.success) {
      store.saveAccessToken(response.data.accessToken);
      dispatch(
        receiveAuthentication(response.data.user, response.data.accessToken)
      );
    } else {
      dispatch(showMessageError(response.error.message));
    }
  } catch (err) {
    dispatch(showMessageError(err.message));
  }
};

export const validateToken = accessToken => async (dispatch, getState) => {
  try {
    const response = await callApi(
      "auth/google/validate/token",
      { accessToken, platform },
      Methods.POST
    );
    if (response.success) {
      store.saveAccessToken(response.data.accessToken);
      dispatch(
        receiveAuthentication(response.data.user, response.data.accessToken)
      );
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        const newAccessToken = getState().auth.accessToken;
        if (newAccessToken !== undefined && newAccessToken !== null) {
          dispatch(validateToken(newAccessToken));
        }
        return;
      }
      dispatch(clearAuthentication());
    }
  } catch (err) {
    dispatch(clearAuthentication());
  }
};

export const logout = () => async (dispatch, getState) => {
  try {
    const { accessToken, guest } = getState().auth;
    if (!guest) {
      await callApi(
        "auth/google/logout",
        { accessToken, platform },
        Methods.POST
      );
    }
  } finally {
    dispatch(clearAuthentication());
  }
};

export const initAuth = () => dispatch => {
  dispatch(fetchingAuthentication());
  const accessToken = store.getAccessToken();

  if (!accessToken) {
    return dispatch(clearAuthentication());
  }
  return dispatch(validateToken(accessToken));
};
