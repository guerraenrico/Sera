import { callApi, Methods } from "../utils/ApiUtils";
import { shouldRefreshToken } from "../utils/RequestUtils";
import { refreshAccessToken } from "./authActions";
import {
  REQUEST_FETCH_TASKS,
  RECEIVE_FETCH_TASKS,
  ERROR_FETCH_TASKS,
  ADD_TASK_LOCAL,
  REMOVE_TASK_LOCAL,
  UPDATE_TASK_LOCAL
} from "../constants/actionTypes";
import { queryItemsLimit } from "../constants/config";
import { showMessageError } from "./messageActions";

const requestFetchTasks = (limit, skip) => ({
  type: REQUEST_FETCH_TASKS,
  limit,
  skip
});

const receiveFetchTasks = tasks => ({
  type: RECEIVE_FETCH_TASKS,
  tasks
});

const errorFetchTasks = error => ({
  type: ERROR_FETCH_TASKS,
  error
});

const addTaskLocal = task => ({
  type: ADD_TASK_LOCAL,
  task
});

const removeTaskLocal = taskIndex => ({
  type: REMOVE_TASK_LOCAL,
  taskIndex
});

const updateTaskLocal = task => ({
  type: UPDATE_TASK_LOCAL,
  task
});

export const fetchTasksByCategory = (
  categoriesId = [],
  completed = false,
  limit = queryItemsLimit,
  skip = 0
) => async (dispatch, getState) => {
  dispatch(requestFetchTasks(limit, skip));
  try {
    const { accessToken } = getState().auth;
    const response = await callApi(
      "tasks",
      {
        categoriesId,
        completed,
        limit,
        skip
      },
      Methods.GET,
      accessToken
    );
    if (response.success) {
      const tasks = response.data.map(task => ({
        ...task,
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        todoWithin: task.todoWithin ? new Date(task.todoWithin) : undefined
      }));
      dispatch(receiveFetchTasks(tasks));
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        dispatch(fetchTasksByCategory(categoriesId, completed, limit, skip));
        return;
      }
      dispatch(errorFetchTasks(response.error.message));
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const deleteTask = (id = "") => async (dispatch, getState) => {
  try {
    const { accessToken } = getState().auth;
    const response = await callApi("tasks", id, Methods.DELETE, accessToken);
    if (response.success) {
      const { items } = getState().todoTasks;
      const todoArgumentIndex = items.findIndex(
        todoArgument => todoArgument.id === id
      );
      dispatch(removeTaskLocal(todoArgumentIndex));
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        dispatch(deleteTask(id));
        return;
      }
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const addTask = (
  title = "",
  description = "",
  category = { id: "" },
  todoWithin,
  callback = undefined
) => async (dispatch, getState) => {
  try {
    const { accessToken } = getState().auth;
    const response = await callApi(
      "tasks",
      {
        title,
        description,
        categoryId: category.id,
        todoWithin
      },
      Methods.POST,
      accessToken
    );
    if (response.success) {
      const fetchedTask = response.data;
      const task = {
        ...fetchedTask,
        completedAt: fetchedTask.completedAt
          ? new Date(fetchedTask.completedAt)
          : undefined,
        todoWithin: fetchedTask.todoWithin
          ? new Date(fetchedTask.todoWithin)
          : undefined
      };
      dispatch(addTaskLocal(task));
      if (callback !== undefined) {
        callback();
      }
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        dispatch(addTask(title, description, category, todoWithin, callback));
        return;
      }
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const toogleTaskCompleted = (id = "", isCompleted = false) => async (
  dispatch,
  getState
) => {
  const completed = !isCompleted;
  const completedAt = completed ? new Date() : null;
  try {
    const { accessToken } = getState().auth;
    const response = await callApi(
      "tasks",
      { id, completed, completedAt },
      Methods.PATCH,
      accessToken
    );
    if (response.success) {
      const fetchedTask = response.data;
      const task = {
        ...fetchedTask,
        completedAt: fetchedTask.completedAt
          ? new Date(fetchedTask.completedAt)
          : undefined
      };
      dispatch(updateTaskLocal(task));
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        dispatch(toogleTaskCompleted(id, isCompleted));
        return;
      }
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};
