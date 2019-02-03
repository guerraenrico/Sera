import * as actionTypes from "../constants/actionTypes";
import { queryItemsLimit } from "../constants/config";

const initialState = {
  isFetching: false,
  items: [],
  limit: queryItemsLimit,
  skip: 0,
  moreToLoad: true,
  error: ""
};

const todoTasks = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_FETCH_TASKS:
      return {
        ...state,
        isFetching: true,
        limit: action.limit,
        skip: action.skip,
        moreToLoad: action.skip === 0 || state.moreToLoad
      };
    case actionTypes.RECEIVE_FETCH_TASKS:
      return {
        ...state,
        isFetching: false,
        items:
          state.skip === 0 ? action.tasks : [...state.items, ...action.tasks],
        moreToLoad: action.tasks.length === state.limit
      };
    case actionTypes.ERROR_FETCH_TASKS:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case actionTypes.ADD_TASK_LOCAL:
      return {
        ...state,
        items: [...state.items, action.task]
      };
    case actionTypes.REMOVE_TASK_LOCAL:
      return {
        ...state,
        items: [
          ...state.items.slice(0, action.taskIndex),
          ...state.items.slice(action.taskIndex + 1)
        ]
      };
    case actionTypes.UPDATE_TASK_LOCAL:
      return {
        ...state,
        items: [
          ...state.items.map(task =>
            task.id === action.task.id ? { ...action.task } : task
          )
        ]
      };
    default:
      return state;
  }
};

export default todoTasks;
