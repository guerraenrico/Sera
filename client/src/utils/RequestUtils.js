import { EXPIRED_SESSION } from "../constants/errors";

export const shouldRefreshToken = response =>
  response !== undefined &&
  response !== null &&
  !response.success &&
  response.error.code === EXPIRED_SESSION;

export default shouldRefreshToken;
