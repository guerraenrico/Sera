import { combineReducers } from 'redux';
import todoFilters from './todoFilters';
import tasks from './tasks';
import message from './message';

const reducersTodoApp = combineReducers({
  todoFilters,
  tasks,
  message,
});

export default reducersTodoApp;
