// @flow
import { queryItemsLimit } from "../constants/config";

import type { Task } from "../models/task";

export type RequestFetchTasksAction = {
  type: "REQUEST_FETCH_TASKS",
  limit: number,
  skip: number
};
export type ReceiveFetchTaskssAction = {
  type: "RECEIVE_FETCH_TASKS",
  tasks: Array<Task>
};
export type ErrorFetchTasksAction = {
  type: "ERROR_FETCH_TASKS",
  error: string
};
export type AddTaskLocalAction = {
  type: "ADD_TASK_LOCAL",
  task: Task
};
export type RemoveTaskAction = {
  type: "REMOVE_TASK_LOCAL",
  taskIndex: number
};
export type UpdateTaskLocalAction = {
  type: "UPDATE_TASK_LOCAL",
  task: Task
};

export type TodoTasksAction =
  | RequestFetchTasksAction
  | ReceiveFetchTaskssAction
  | ErrorFetchTasksAction
  | AddTaskLocalAction
  | RemoveTaskAction
  | UpdateTaskLocalAction;

export type TodoTasksState = {
  +isFetching: boolean,
  +items: Array<Task>,
  +limit: number,
  +skip: number,
  +moreToLoad: boolean,
  +error: string
};

const initialState: TodoTasksState = {
  isFetching: false,
  items: [],
  limit: queryItemsLimit,
  skip: 0,
  moreToLoad: true,
  error: ""
};

const todoTasks = (
  state: TodoTasksState = initialState,
  action: TodoTasksAction
) => {
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
        items: [...state.items, action.task]
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
            // $FlowFixMe remove flow error on action.task
            task.id === action.task.id ? { ...action.task } : task
          )
        ]
      };
    default:
      return state;
  }
};

export default todoTasks;
