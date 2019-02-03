import * as actionTypes from "../constants/actionTypes";

const initialState = {
  isFetching: true,
  user: undefined,
  accessToken: undefined
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_AUTHENTICATION:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECEIVE_AUTHENTICATION:
      return {
        ...state,
        isFetching: false,
        user: action.user,
        accessToken: action.accessToken
      };
    case actionTypes.CLEAR_AUTHENTICATION:
      return {
        isFetching: false,
        user: undefined,
        accessToken: undefined
      };
    case actionTypes.REFRESH_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken
      };
    default:
      return state;
  }
};

export default auth;
