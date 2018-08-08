import { callApi, Methods } from '../utils/ApiUtils';
import {
  REQUEST_FETCH_ARGUMENTS,
  RECEIVE_FETCH_ARGUMENTS,
  ERROR_FETCH_ARGUMENTS,
  ADD_ARGUMENT_LOCAL,
  REMOVE_ARGUMENT_LOCAL,
  UPDATE_ARGUMENT_LOCAL,
} from '../constants/actionTypes';
import { queryItemsLimit } from '../constants/config';
import { showMessageError } from './messageActions';
import { toJsDate } from '../utils/Common';

const requestFetchArguments = (limit, skip) => (
  {
    type: REQUEST_FETCH_ARGUMENTS,
    limit,
    skip,
  }
);

const receiveFetchArguments = todoArguments => (
  {
    type: RECEIVE_FETCH_ARGUMENTS,
    todoArguments,
  }
);

const errorFetchArguments = error => (
  {
    type: ERROR_FETCH_ARGUMENTS,
    error,
  }
);

const addArgumentLocal = todoArgument => (
  {
    type: ADD_ARGUMENT_LOCAL,
    todoArgument,
  }
);

const removeArgumentLocal = todoArgumentIndex => (
  {
    type: REMOVE_ARGUMENT_LOCAL,
    todoArgumentIndex,
  }
);

const updateArgumentLocal = todoArgument => (
  {
    type: UPDATE_ARGUMENT_LOCAL,
    todoArgument,
  }
);

export const fetchTodoArgumentsByCategory = (
  categoriesId = [],
  completed = false,
  limit = queryItemsLimit,
  skip = 0,
) => (dispatch) => {
  dispatch(requestFetchArguments(limit, skip));
  const request = callApi('tasks', {
    categoriesId, completed, limit, skip,
  }, Methods.GET);
  return request.then(
    (response) => {
      if (response.success) {
        const todos = response.data.map(todo =>
          ({
            ...todo,
            completedAt: (todo.completedAt) ? toJsDate(todo.completedAt) : undefined,
            todoWithin: (todo.todoWithin) ? toJsDate(todo.todoWithin) : undefined,
          }));
        dispatch(receiveFetchArguments(todos));
      } else {
        dispatch(errorFetchArguments(response.messageError));
      }
    },
    error => ({ error }),
  );
};

export const deleteTodoArgument = (id = '') => (dispatch, getState) => {
  const request = callApi('tasks', id, Methods.DELETE);
  return request.then(
    (response) => {
      if (response.success) {
        const { items } = getState().todoArguments;
        const todoArgumentIndex = items.findIndex(todoArgument =>
          todoArgument.id === id);
        dispatch(removeArgumentLocal(todoArgumentIndex));
      } else {
        dispatch(showMessageError(response.messageError));
      }
    },
    error => ({ error }),
  );
};

export const addTodoArgument = (title = '', description = '', category = { id: '' }, todoWithin, callback = undefined) => (dispatch) => {
  const request = callApi(
    'tasks',
    {
      title,
      description,
      categoryId: category.id,
      todoWithin,
    },
    Methods.POST,
  );
  return request.then(
    (response) => {
      if (response.success) {
        const todo = {
          ...response.data,
          completedAt: (response.data.completedAt)
            ? toJsDate(response.data.completedAt) : undefined,
          todoWithin: (response.data.todoWithin)
            ? toJsDate(response.data.todoWithin) : undefined,
        };
        dispatch(addArgumentLocal(todo));
        if (callback !== undefined) {
          callback();
        }
      } else {
        dispatch(showMessageError(response.messageError));
      }
    },
    error => ({ error }),
  );
};

export const toogleTodoArgumentCompleted = (id = '', completed = false) => (dispatch) => {
  const request = callApi('tasks', { id, completed }, Methods.PATCH);
  return request.then(
    (response) => {
      if (response.success) {
        const todo = {
          ...response.data,
          completedAt: (response.data.completedAt)
            ? toJsDate(response.data.completedAt) : undefined,
        };
        dispatch(updateArgumentLocal(todo));
      } else {
        dispatch(showMessageError(response.messageError));
      }
    },
    error => ({ error }),
  );
};
