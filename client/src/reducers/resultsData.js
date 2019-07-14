// @flow
import type { ResultsData } from "../models/resultsData";

export type RequestFetchResultsAction = {
  type: "REQUEST_FETCH_RESULTS"
};
export type ReceiveFetchResultsAction = {
  type: "RECEIVE_FETCH_RESULTS",
  data: ResultsData
};
export type ErrorFetchResultsAction = {
  type: "ERROR_FETCH_RESULTS",
  error: string
};

export type ResultsAction =
  | RequestFetchResultsAction
  | ReceiveFetchResultsAction
  | ErrorFetchResultsAction;

export type ResultsState = {
  +isFetching: boolean,
  +data: ResultsData,
  +error: string
};

const initialState: ResultsState = {
  isFetching: false,
  data: {
    tasks: { completed: 0, total: 0 },
    goals: { completed: 0, total: 0 }
  },
  error: ""
};

const resultsData = (
  state: ResultsState = initialState,
  action: ResultsAction
) => {
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
