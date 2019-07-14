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
    case "REQUEST_FETCH_TASKS":
      return {
        ...state,
        isFetching: true,
        limit: action.limit,
        skip: action.skip,
        moreToLoad: action.skip === 0 || state.moreToLoad
      };
    case "RECEIVE_FETCH_TASKS":
      return {
        ...state,
        isFetching: false,
        items:
          state.skip === 0 ? action.tasks : [...state.items, ...action.tasks],
        skip: state.limit,
        moreToLoad: action.tasks.length === state.limit
      };
    case "ERROR_FETCH_TASKS":
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case "ADD_TASK_LOCAL":
      return {
        ...state,
        items: [action.task, ...state.items]
      };
    case "REMOVE_TASK_LOCAL":
      return {
        ...state,
        items: [
          ...state.items.slice(0, action.taskIndex),
          ...state.items.slice(action.taskIndex + 1)
        ]
      };
    case "UPDATE_TASK_LOCAL":
      return {
        ...state,
        items: [
          ...state.items.map(task =>
            task.id === action.id ? { ...task, ...action.data } : task
          )
        ]
      };
    case "CHANGE_TASK_ORDER_LOCAL":
      const items = Array.from(state.items);
      items.splice(action.previousIndex, 1);
      items.splice(action.nextIndex, 0, state.items[action.previousIndex]);
      return {
        ...state,
        items
      };
    default:
      return state;
  }
};

export default todoTasks;
