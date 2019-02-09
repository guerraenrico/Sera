// @flow
import type { User } from "../models/user";

export type FetchingAuthenticationAction = {
  type: "FETCHING_AUTHENTICATION"
};
export type ReceiveAuthenticationAction = {
  type: "RECEIVE_AUTHENTICATION",
  user: User,
  accessToken: string
};
export type ClearAuthenticationAction = {
  type: "CLEAR_AUTHENTICATION"
};

export type RefreshAccessTokenAction = {
  type: "REFRESH_ACCESS_TOKEN",
  accessToken: string
};

export type AuthAction =
  | FetchingAuthenticationAction
  | ReceiveAuthenticationAction
  | ClearAuthenticationAction
  | RefreshAccessTokenAction;

export type AuthState = {
  +isFetching: boolean,
  +user: ?User,
  +accessToken: ?string
};

const initialState: AuthState = {
  isFetching: true,
  user: undefined,
  accessToken: undefined
};

const auth = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case "FETCHING_AUTHENTICATION":
      return {
        ...state,
        isFetching: true
      };
    case "RECEIVE_AUTHENTICATION":
      return {
        ...state,
        isFetching: false,
        user: action.user,
        accessToken: action.accessToken
      };
    case "CLEAR_AUTHENTICATION":
      return {
        isFetching: false,
        user: undefined,
        accessToken: undefined
      };
    case "REFRESH_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.accessToken
      };
    default:
      return state;
  }
};

export default auth;
