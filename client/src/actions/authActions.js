import {
  FETCHING_AUTHENTICATION,
  RECEIVE_AUTHENTICATION,
  CLEAR_AUTHENTICATION,
  REFRESH_ACCESS_TOKEN,
} from '../constants/actionTypes';
import { callApi, Methods } from '../utils/ApiUtils';
import * as store from '../utils/StoreUtils';
import { showMessageError } from './messageActions';

const platform = 'web';

const fetchingAuthentication = () => (
  {
    type: FETCHING_AUTHENTICATION,
  }
);

const receiveAuthentication = (user, accessToken) => (
  {
    type: RECEIVE_AUTHENTICATION,
    user,
    accessToken,
  }
);

export const clearAuthentication = () => (dispatch) => {
  store.removeAccessToken();
  dispatch({
    type: CLEAR_AUTHENTICATION,
  });
};

export const refreshAccessToken = newAccessToken => (dispatch, getState) => {
  const { accessToken } = getState().auth;
  if (accessToken === newAccessToken) {
    return;
  }
  store.saveAccessToken(accessToken);
  dispatch({
    type: REFRESH_ACCESS_TOKEN,
    accessToken,
  });
};

export const authenticateGoogleToken = code => async (dispatch) => {
  try {
    const response = await callApi('auth/google/signin/callback', { code, platform }, Methods.POST);
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

export const validateToken = accessToken => async (dispatch) => {
  try {
    const response = await callApi('auth/google/validate/token', { accessToken, platform }, Methods.POST);
    if (response.success) {
      store.saveAccessToken(response.accessToken);
      dispatch(receiveAuthentication(response.data, response.accessToken));
    } else {
      dispatch(clearAuthentication());
    }
  } catch (err) {
    dispatch(clearAuthentication());
  }
};

export const logout = () => async (dispatch, getState) => {
  try {
    const { accessToken } = getState().auth;
    await callApi('auth/google/logout', { accessToken, platform }, Methods.POST);
  } finally {
    dispatch(clearAuthentication());
  }
};

export const initAuth = () => (dispatch) => {
  dispatch(fetchingAuthentication());
  const accessToken = store.getAccessToken();

  if (accessToken === undefined || accessToken === '') {
    return dispatch(clearAuthentication());
  }
  return dispatch(validateToken(accessToken));
};
