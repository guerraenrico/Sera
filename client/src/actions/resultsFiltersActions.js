import { fetchResults } from "./resultsDataActions";

const switchTimeInterval = timeInterval => ({
  type: "SWITCH_TIME_INTERVAL",
  timeInterval
});

/**
 * Change selected time interval; fetch results that
 * match the selected interval
 * @param {TimeInterval} timeInterval new time interval
 */
export const changeTimeInterval = timeInterval => dispatch => {
  dispatch(switchTimeInterval(timeInterval));
  return dispatch(fetchResults());
};
