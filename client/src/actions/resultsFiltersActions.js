// @flow

import { fetchResults } from "./resultsDataActions";

import type {
  TimeInterval,
  SwitchTimeIntervalAction
} from "../reducers/resultsFilters";

import type { ThunkAction } from "../reducers";

const switchTimeInterval = (
  timeInterval: TimeInterval
): SwitchTimeIntervalAction => ({
  type: "SWITCH_TIME_INTERVAL",
  timeInterval
});

/**
 * Change selected time interval; fetch results that
 * match the selected interval
 * @param {TimeInterval} timeInterval new time interval
 */
export const changeTimeInterval = (
  timeInterval: TimeInterval
): ThunkAction => dispatch => {
  dispatch(switchTimeInterval(timeInterval));
  return dispatch(fetchResults());
};
