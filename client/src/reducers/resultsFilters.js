// @flow

export type Week = "WEEK";
export type Month = "MONTH";
export type Year = "YEAR";

export type TimeInterval = Week | Month | Year;

export type SwitchTimeIntervalAction = {
  type: "SWITCH_TIME_INTERVAL",
  timeInterval: TimeInterval
};

export type ResultsFiltersAction = SwitchTimeIntervalAction;

export type ResultsFiltersState = {
  +timeInterval: TimeInterval
};

const setTimeInterval = (
  current: TimeInterval,
  next: TimeInterval
): TimeInterval => {
  if (current !== next) {
    return next;
  }
  return current;
};

const initialState: ResultsFiltersState = {
  timeInterval: "MONTH"
};

const resultsFilters = (
  state: ResultsFiltersState = initialState,
  action: ResultsFiltersAction
) => {
  switch (action.type) {
    case "SWITCH_TIME_INTERVAL":
      return {
        ...state,
        timeInterval: setTimeInterval(state.timeInterval, action.timeInterval)
      };
    default:
      return state;
  }
};

export default resultsFilters;
