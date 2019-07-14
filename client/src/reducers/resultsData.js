const initialState = {
  isFetching: false,
  data: {
    tasks: { completed: 0, total: 0 },
    goals: { completed: 0, total: 0 }
  },
  error: ""
};

const resultsData = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_FETCH_RESULTS":
      return {
        ...state,
        isFetching: true
      };
    case "RECEIVE_FETCH_RESULTS":
      return {
        ...state,
        isFetching: false,
        data: action.data
      };
    case "ERROR_FETCH_RESULTS":
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default resultsData;
