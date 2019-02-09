// @flow
import { callApi, Methods } from "../utils/ApiUtils";
import { shouldRefreshToken } from "../utils/RequestUtils";
import { refreshAccessToken } from "./authActions";

import { queryItemsLimit } from "../constants/config";
import { showMessageError } from "./messageActions";

import type {
  RequestFetchTasksAction,
  ReceiveFetchTaskssAction,
  ErrorFetchTasksAction,
  AddTaskLocalAction,
  RemoveTaskAction,
  UpdateTaskLocalAction
} from "../reducers/todoTasks";

import type { Task } from "../models/task";

const requestFetchTasks = (limit: number, skip): RequestFetchTasksAction => ({
  type: "REQUEST_FETCH_TASKS",
  limit,
  skip
});

const receiveFetchTasks = (tasks: Array<Task>): ReceiveFetchTaskssAction => ({
  type: "RECEIVE_FETCH_TASKS",
  tasks
});

const errorFetchTasks = (error: string): ErrorFetchTasksAction => ({
  type: "ERROR_FETCH_TASKS",
  error
});

const addTaskLocal = (task: Task): AddTaskLocalAction => ({
  type: "ADD_TASK_LOCAL",
  task
});

const removeTaskLocal = (taskIndex: number): RemoveTaskAction => ({
  type: "REMOVE_TASK_LOCAL",
  taskIndex
});

const updateTaskLocal = (task: Task): UpdateTaskLocalAction => ({
  type: "UPDATE_TASK_LOCAL",
  task
});

export const fetchTasksByCategory = (
  categoriesId: string[] = [],
  completed: boolean = false,
  limit: number = queryItemsLimit,
  skip: number = 0
) => async (
  dispatch: ({}) => void,
  getState: () => { auth: { accessToken: string } }
) => {
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

export const deleteTask = (id: string = "") => async (
  dispatch: ({}) => void,
  getState: () => { auth: { accessToken: string }, todoTasks: { items: [] } }
) => {
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
  title: string = "",
  description: string = "",
  category: { id: string } = { id: "" },
  todoWithin: Date,
  callback: () => void
) => async (
  dispatch: ({}) => void,
  getState: () => { auth: { accessToken: string } }
) => {
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

export const toogleTaskCompleted = (
  id: string = "",
  isCompleted: boolean = false
) => async (
  dispatch: ({}) => void,
  getState: () => { auth: { accessToken: string } }
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
