import { callApi, Methods } from '../utils/ApiUtils';
import { refreshAccessToken } from './authActions';
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
  try {
    const response = await callApi('tasks', {
      categoriesId, completed, limit, skip,
    }, Methods.GET);
    if (response.success) {
      dispatch(refreshAccessToken(response.data.accessToken));
      const tasks = response.data.tasks.map(task =>
        ({
          ...task,
          completedAt: (task.completedAt) ? new Date(task.completedAt) : undefined,
          todoWithin: (task.todoWithin) ? new Date(task.todoWithin) : undefined,
        }));
      dispatch(receiveFetchTasks(tasks));
    } else {
      dispatch(errorFetchTasks(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const deleteTask = (id = '') => async (dispatch, getState) => {
  try {
    const response = await callApi('tasks', id, Methods.DELETE);
    if (response.success) {
      const { items } = getState().todoTasks;
      dispatch(refreshAccessToken(response.data.accessToken));
      const todoArgumentIndex = items.findIndex(todoArgument =>
        todoArgument.id === id);
      dispatch(removeTaskLocal(todoArgumentIndex));
    } else {
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const addTask = (title = '', description = '', category = { id: '' }, todoWithin, callback = undefined) => async (dispatch) => {
  try {
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
      dispatch(refreshAccessToken(response.data.accessToken));
      const fetchedTask = response.data.task;
      const task = {
        ...fetchedTask,
        completedAt: (fetchedTask.completedAt)
          ? new Date(fetchedTask.completedAt) : undefined,
        todoWithin: (fetchedTask.todoWithin)
          ? new Date(fetchedTask.todoWithin) : undefined,
      };
      dispatch(addTaskLocal(task));
      if (callback !== undefined) {
        callback();
      }
    } else {
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const toogleTaskCompleted = (id = '', isCompleted = false) => async (dispatch) => {
  const completed = !isCompleted;
  const completedAt = (completed) ? new Date() : null;
  try {
    const response = await callApi('tasks', { id, completed, completedAt }, Methods.PATCH);
    if (response.success) {
      dispatch(refreshAccessToken(response.data.accessToken));
      const fetchedTask = response.data.task;
      const task = {
        ...fetchedTask,
        completedAt: (fetchedTask.completedAt)
          ? new Date(fetchedTask.completedAt) : undefined,
      };
      dispatch(updateTaskLocal(task));
    } else {
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};
