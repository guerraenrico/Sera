import { callApi, Methods } from "../utils/ApiUtils";
import { shouldRefreshToken } from "../utils/RequestUtils";
import { refreshAccessToken } from "./authActions";

import { showMessageError } from "./messageActions";

const requestFetchResults = () => ({
  type: "REQUEST_FETCH_RESULTS"
});

const receiveFetchResults = data => ({
  type: "RECEIVE_FETCH_RESULTS",
  data
});

const errorFetchResults = error => ({
  type: "ERROR_FETCH_RESULTS",
  error
});

/**
 * Fetch user results. If an error accour check if it's caused by the token that is expired;
 * if this is the case the token is refreshed and retry fetch
 */
export const fetchResults = () => async (dispatch, getState) => {
  const { resultsData, resultsFilters, auth } = getState();
  const { accessToken } = auth;
  if (resultsData.isFetching) {
    return;
  }
  if (auth.guest) {
    return;
  }
  dispatch(requestFetchResults());
  try {
    const { timeInterval } = resultsFilters;
    const response = await callApi(
      "results",
      {
        timeInterval
      },
      Methods.GET,
      accessToken
    );
    if (response.success) {
      dispatch(receiveFetchResults(response.data));
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        dispatch(fetchResults());
        return;
      }
      dispatch(errorFetchResults(response.error.message));
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};
