export const isFetchingAuthentication = state => state.auth.isFetching;
export const isAuthenticated = state =>
  (state.auth.user !== undefined && state.auth.accessToken !== undefined) ||
  state.auth.guest;
export const user = state => state.auth.user;
