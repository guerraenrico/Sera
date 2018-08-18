import { combineReducers } from 'redux';
import todoFilters from './todoFilters';
import todoTasks from './todoTasks';
import message from './message';

const reducersTodoApp = combineReducers({
  todoFilters,
  todoTasks,
  message,
});

export default reducersTodoApp;
