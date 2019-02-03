import { combineReducers } from "redux";
import auth from "./auth";
import todoFilters from "./todoFilters";
import todoTasks from "./todoTasks";
import message from "./message";

const reducersTodoApp = combineReducers({
  auth,
  todoFilters,
  todoTasks,
  message
});

export default reducersTodoApp;
