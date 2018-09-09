import { callApi, Methods } from '../utils/ApiUtils';
import {
  REQUEST_FETCH_TASKS,
  RECEIVE_FETCH_TASKS,
  ERROR_FETCH_TASKS,
  ADD_TASK_LOCAL,
  REMOVE_TASK_LOCAL,
  UPDATE_TASK_LOCAL,
} from '../constants/actionTypes';
import { queryItemsLimit } from '../constants/config';
import { showMessageError } from './messageActions';

const requestFetchTasks = (limit, skip) => (
  {
    type: REQUEST_FETCH_TASKS,
    limit,
    skip,
  }
);

const receiveFetchTasks = tasks => (
  {
    type: RECEIVE_FETCH_TASKS,
    tasks,
  }
);

const errorFetchTasks = error => (
  {
    type: ERROR_FETCH_TASKS,
    error,
  }
);

const addTaskLocal = task => (
  {
    type: ADD_TASK_LOCAL,
    task,
  }
);

const removeTaskLocal = taskIndex => (
  {
    type: REMOVE_TASK_LOCAL,
    taskIndex,
  }
);

const updateTaskLocal = task => (
  {
    type: UPDATE_TASK_LOCAL,
    task,
  }
);

export const fetchTasksByCategory = (
  categoriesId = [],
  completed = false,
  limit = queryItemsLimit,
  skip = 0,
) => async (dispatch) => {
  dispatch(requestFetchTasks(limit, skip));
  const response = await callApi('tasks', {
    categoriesId, completed, limit, skip,
  }, Methods.GET);
  if (response.success) {
    const todos = response.data.map(todo =>
      ({
        ...todo,
        completedAt: (todo.completedAt) ? new Date(todo.completedAt) : undefined,
        todoWithin: (todo.todoWithin) ? new Date(todo.todoWithin) : undefined,
      }));
    dispatch(receiveFetchTasks(todos));
  } else {
    dispatch(errorFetchTasks(response.messageError));
  }
};

export const deleteTask = (id = '') => async (dispatch, getState) => {
  const response = await callApi('tasks', id, Methods.DELETE);
  if (response.success) {
    const { items } = getState().todoTasks;
    const todoArgumentIndex = items.findIndex(todoArgument =>
      todoArgument.id === id);
    dispatch(removeTaskLocal(todoArgumentIndex));
  } else {
    dispatch(showMessageError(response.messageError));
  }
};

export const addTask = (title = '', description = '', category = { id: '' }, todoWithin, callback = undefined) => async (dispatch) => {
  const response = await callApi(
    'tasks',
    {
      title,
      description,
      categoryId: category.id,
      todoWithin,
    },
    Methods.POST,
  );
  if (response.success) {
    const todo = {
      ...response.data,
      completedAt: (response.data.completedAt)
        ? new Date(response.data.completedAt) : undefined,
      todoWithin: (response.data.todoWithin)
        ? new Date(response.data.todoWithin) : undefined,
    };
    dispatch(addTaskLocal(todo));
    if (callback !== undefined) {
      callback();
    }
  } else {
    dispatch(showMessageError(response.messageError));
  }
};

export const toogleTaskCompleted = (id = '', isCompleted = false) => async (dispatch) => {
  const completed = !isCompleted;
  const completedAt = (completed) ? new Date() : null;
  const response = await callApi('tasks', { id, completed, completedAt }, Methods.PATCH);
  if (response.success) {
    const todo = {
      ...response.data,
      completedAt: (response.data.completedAt)
        ? new Date(response.data.completedAt) : undefined,
    };
    dispatch(updateTaskLocal(todo));
  } else {
    dispatch(showMessageError(response.messageError));
  }
};
