const initialState = {
  isFetching: true,
  guest: false,
  user: undefined,
  accessToken: undefined
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "ENTER_AS_GUEST": {
      return {
        ...state,
        isFetching: false,
        guest: true,
        user: undefined,
        accessToken: undefined
      };
    }
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
        ...state,
        isFetching: false,
        guest: false,
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
