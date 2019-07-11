// @flow
import { combineReducers } from "redux";
import auth from "./auth";
import todoFilters from "./todoFilters";
import todoTasks from "./todoTasks";
import message from "./message";
import resultsFilters from "./resultsFilters";
import resultsData from "./resultsData";

import type { AuthAction, AuthState } from "./auth";
import type { TodoFiltersAction, TodoFiltersState } from "./todoFilters";
import type { TodoTasksAction, TodoTasksState } from "./todoTasks";
import type { MessageAction, MessageState } from "./message";
import type {
  ResultsFiltersAction,
  ResultsFiltersState
} from "./resultsFilters";
import type { ResultsAction, ResultsState } from "./resultsData";

type State = {
  auth: AuthState,
  todoFilters: TodoFiltersState,
  todoTasks: TodoTasksState,
  message: MessageState,
  resultsFilters: ResultsFiltersState,
  resultsData: ResultsState
};
type Action =
  | AuthAction
  | TodoFiltersAction
  | TodoTasksAction
  | MessageAction
  | ResultsFiltersAction
  | ResultsAction;

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
// eslint-disable-next-line
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

const reducersTodoApp = combineReducers({
  auth,
  todoFilters,
  todoTasks,
  message,
  resultsFilters,
  resultsData
});

export default reducersTodoApp;
