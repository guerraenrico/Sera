// @flow
import { combineReducers } from "redux";
import auth from "./auth";
import todoFilters from "./todoFilters";
import todoTasks from "./todoTasks";
import message from "./message";
import resultsFilters from "./resultsFilters";
import resultsData from "./resultsData";

const reducersTodoApp = combineReducers({
  auth,
  todoFilters,
  todoTasks,
  message,
  resultsFilters,
  resultsData
});

export default reducersTodoApp;
