import { TimeInterval } from "~/models/resultsData";

const setTimeInterval = (current, next) => {
  if (current !== next) {
    return next;
  }
  return current;
};

const initialState = {
  timeInterval: TimeInterval.MONTH
};

const resultsFilters = (state = initialState, action) => {
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
