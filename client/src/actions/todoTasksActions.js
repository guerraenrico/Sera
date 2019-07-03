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
  UpdateTaskLocalAction,
  ChangeTaskOrderLocalAction
} from "../reducers/todoTasks";
import { visibilityOnlyCompleted } from "../selectors/todoFiltersSelectors";

import type { Task } from "../models/task";
import type { Category } from "../models/category";
import type { ThunkAction } from "../reducers";

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

const updateTaskLocal = (id, data): UpdateTaskLocalAction => ({
  type: "UPDATE_TASK_LOCAL",
  id,
  data
});

const changeTaskOrderLocal = (
  id,
  previousIndex,
  nextIndex
): ChangeTaskOrderLocalAction => ({
  type: "CHANGE_TASK_ORDER_LOCAL",
  id,
  previousIndex,
  nextIndex
});

export const fetchTasksByCategory = (
  categoriesId: string[] = [],
  completed: boolean = false,
  skip: number = 0,
  limit: number = queryItemsLimit
): ThunkAction => async (dispatch, getState) => {
  const { todoTasks, auth } = getState();
  const { accessToken } = auth;
  if (todoTasks.isFetching) {
    return;
  }
  if (auth.guest) {
    dispatch(receiveFetchTasks(todoTasks.items));
    return;
  }
  dispatch(requestFetchTasks(limit, skip));
  try {
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

export const addTask = (
  title: string = "",
  description: string = "",
  category?: Category,
  todoWithin: Date
): ThunkAction => async (dispatch, getState) => {
  try {
    const { accessToken, guest } = getState().auth;
    if (guest) {
      dispatch(
        addTaskLocal({
          id: new Date().getTime().toString(),
          title,
          description,
          completed: false,
          todoWithin,
          completedAt: undefined,
          createdAt: new Date(),
          userId: "guest",
          categories: category ? [category] : []
        })
      );
      return { success: true };
    }
    const response = await callApi(
      "tasks",
      {
        title,
        description,
        categories: category ? [category] : [],
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
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        return dispatch(addTask(title, description, category, todoWithin));
      }
      dispatch(showMessageError(response.error.message));
    }
    return response;
  } catch (error) {
    dispatch(showMessageError(error.message));
    return { success: false };
  }
};

export const deleteTask = (id: string = ""): ThunkAction => async (
  dispatch,
  getState
) => {
  try {
    const { todoTasks, auth } = getState();
    const { items } = todoTasks;
    const todoArgumentIndex = items.findIndex(
      todoArgument => todoArgument.id === id
    );
    dispatch(removeTaskLocal(todoArgumentIndex));
    if (auth.guest) {
      return;
    }
    const { accessToken } = getState().auth;
    const response = await callApi("tasks", id, Methods.DELETE, accessToken);
    if (!response.success) {
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

export const toggleTaskCompleted = (
  id: string = "",
  isCompleted: boolean = false
): ThunkAction => async (dispatch, getState) => {
  const { accessToken, guest } = getState().auth;
  const completed = !isCompleted;
  const completedAt = completed ? new Date() : undefined;
  dispatch(updateTaskLocal(id, { completed, completedAt }));
  if (guest) {
    return;
  }
  try {
    const response = await callApi(
      "tasks/toggle-complete",
      { id, completed, completedAt },
      Methods.PATCH,
      accessToken
    );
    if (!response.success) {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        dispatch(toggleTaskCompleted(id, isCompleted));
        return;
      }
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const setCategoryToTask = (
  task: Task,
  category: Category
): ThunkAction => async (dispatch, getState) => {
  const { accessToken, guest } = getState().auth;
  // $FlowFixMe
  const updatedData = { categories: [...task.categories, category] };
  dispatch(updateTaskLocal(task.id, updatedData));
  if (guest) {
    return { success: true };
  }
  try {
    const response = await callApi(
      "tasks",
      { ...task, ...updatedData },
      Methods.PATCH,
      accessToken
    );
    if (!response.success) {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        return dispatch(setCategoryToTask(task, category));
      }
      dispatch(showMessageError(response.error.message));
    }
    return response;
  } catch (error) {
    dispatch(showMessageError(error.message));
    return { success: false };
  }
};

export const createAndSetCategoryToTask = (
  task: Task,
  name: string
): ThunkAction => async (dispatch, getState) => {
  try {
    const { accessToken, guest } = getState().auth;
    if (guest) {
      // TODO: Add category to store the assign to task
      return { success: true };
    }
    const response = await callApi(
      "categories",
      { name },
      Methods.POST,
      accessToken
    );
    if (response.success) {
      const category = response.data;
      return dispatch(setCategoryToTask(task, category));
    }
    if (shouldRefreshToken(response)) {
      await dispatch(refreshAccessToken());
      return dispatch(createAndSetCategoryToTask(task, name));
    }
    dispatch(showMessageError(response.error.message));
    return response;
  } catch (error) {
    dispatch(showMessageError(error.message));
    return { success: false };
  }
};

export const removeCategoryToTask = (
  task: Task,
  category: Category
): ThunkAction => async (dispatch, getState) => {
  const { accessToken, guest } = getState().auth;
  const updatedData = {
    // $FlowFixMe
    categories: task.categories.filter(cat => cat.id !== category.id)
  };
  dispatch(updateTaskLocal(task.id, updatedData));
  if (guest) {
    return { success: true };
  }
  try {
    const response = await callApi(
      "tasks",
      { ...task, ...updatedData },
      Methods.PATCH,
      accessToken
    );
    if (!response.success) {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        return dispatch(removeCategoryToTask(task, category));
      }
      dispatch(showMessageError(response.error.message));
    }
    return response;
  } catch (error) {
    dispatch(showMessageError(error.message));
    return { success: false };
  }
};

export const changeTaskOrder = (
  previousIndex: number,
  nextIndex: number,
  taskId: string
): ThunkAction => async (dispatch, getState) => {
  const { auth, todoTasks } = getState();
  const { accessToken, guest } = auth;
  const { items } = todoTasks;
  const task = items[previousIndex];
  const nextTask = items[nextIndex + 1] || "";
  dispatch(changeTaskOrderLocal(taskId, previousIndex, nextIndex));
  if (guest) {
    return { success: true };
  }
  try {
    const response = await callApi(
      "tasks/position",
      { task, nextId: nextTask ? nextTask.id : "" },
      Methods.PATCH,
      accessToken
    );
    if (!response.success) {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        return dispatch(changeTaskOrder(previousIndex, nextIndex, taskId));
      }
      dispatch(showMessageError(response.error.message));
    }
    return response;
  } catch (error) {
    dispatch(showMessageError(error.message));
    return { success: false };
  }
};

export const searchTask = (text: string): ThunkAction => async (
  dispatch,
  getState
) => {
  const { accessToken, guest } = getState().auth;
  const completed = visibilityOnlyCompleted(getState());
  if (guest) {
    dispatch(showMessageError("Operation not available in guest mode"));
    return;
  }
  try {
    // All matching task are return when searching
    dispatch(requestFetchTasks(-1, 0));
    const response = await callApi(
      "tasks/search",
      { text, completed },
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
      return;
    }
    if (shouldRefreshToken(response)) {
      await dispatch(refreshAccessToken());
      dispatch(searchTask(text));
      return;
    }
    dispatch(showMessageError(response.error.message));
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};
