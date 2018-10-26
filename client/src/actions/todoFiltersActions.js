import { callApi, Methods } from '../utils/ApiUtils';
import { refreshAccessToken } from './authActions';
import {
  REQUEST_FETCH_ALL_CATEGORIES,
  RECEIVE_FETCH_ALL_CATEGORIES,
  ERROR_FETCH_ALL_CATEGORIES,
  ADD_CATEGORY_LOCAL,
  REMOVE_CATEGORY_LOCAL,
  TOOGLE_SELECT_CATEGORY,
  TOOGLE_SELECT_CATEGORY_ALL,
  SWITCH_VISIBILITY_FILTER,
} from '../constants/actionTypes';
import { queryItemsLimit } from '../constants/config';
import { fetchTasksByCategory } from './todoTasksActions';
import { showMessageError } from './messageActions';
import { getSelectedCategoriesId, visibilityOnlyCompleted } from '../selectors/todoFiltersSelectors';

const fetchTasks = state => fetchTasksByCategory(
  getSelectedCategoriesId(state),
  visibilityOnlyCompleted(state),
);

const requestFetchAllCategories = () => (
  {
    type: REQUEST_FETCH_ALL_CATEGORIES,
  }
);

const receiveFetchAllCategories = categories => (
  {
    type: RECEIVE_FETCH_ALL_CATEGORIES,
    categories,
  }
);

const errorFetchAllCategories = error => (
  {
    type: ERROR_FETCH_ALL_CATEGORIES,
    error,
  }
);

const addCategoryLocal = category => (
  {
    type: ADD_CATEGORY_LOCAL,
    category,
  }
);

const removeCategoryLocal = categoryIndex => (
  {
    type: REMOVE_CATEGORY_LOCAL,
    categoryIndex,
  }
);

const toogleSelectCategory = selectedCategory => (
  {
    type: TOOGLE_SELECT_CATEGORY,
    selectedCategory,
  }
);

const toogleSelectCategoryAll = () => (
  {
    type: TOOGLE_SELECT_CATEGORY_ALL,
  }
);

const switchVisibilityFilter = visibility => (
  {
    type: SWITCH_VISIBILITY_FILTER,
    visibility,
  }
);

export const fetchAllCategories = (limit = queryItemsLimit, skip = 0) =>
  async (dispatch, getState) => {
    dispatch(requestFetchAllCategories());
    try {
      const { accessToken } = getState().auth;
      const response = await callApi('categories', { limit, skip }, Methods.GET, accessToken);
      if (response.success) {
        dispatch(refreshAccessToken(response.accessToken));
        dispatch(receiveFetchAllCategories(response.data));
        dispatch(fetchTasksByCategory(getSelectedCategoriesId(getState())));
      } else {
        dispatch(errorFetchAllCategories(response.error.message));
      }
    } catch (error) {
      dispatch(showMessageError(error.message));
    }
  };

export const deleteCategory = (categoryId = '') => async (dispatch, getState) => {
  try {
    const { accessToken } = getState().auth;
    const response = await callApi('categories', categoryId, Methods.DELETE, accessToken);
    if (response.success) {
      dispatch(refreshAccessToken(response.accessToken));
      const { categories } = getState().todoFilters;
      const categoryIndex = categories.findIndex(category => category.id === categoryId);
      dispatch(removeCategoryLocal(categoryIndex));
    } else {
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

/**
 * Request to add a category
 * @param {String} name category name to add
 * @param {Function} callback function that need to handle the category created
 */
export const addCategory = (name = '', callback = undefined) => async (dispatch, getState) => {
  try {
    const { accessToken } = getState().auth;
    const response = await callApi('categories', { name }, Methods.POST, accessToken);
    if (response.success) {
      const category = response.data;
      dispatch(refreshAccessToken(response.accessToken));
      dispatch(addCategoryLocal(category));
      if (callback !== undefined) {
        callback(category);
      }
    } else {
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const changeVisibility = visibility => (dispatch, getState) => {
  dispatch(switchVisibilityFilter(visibility));
  return dispatch(fetchTasks(getState()));
};

export const selectCategory = selectedCategory => (dispatch, getState) => {
  dispatch(toogleSelectCategory(selectedCategory));
  return dispatch(fetchTasks(getState()));
};

export const selectCategoryAll = () => (dispatch, getState) => {
  dispatch(toogleSelectCategoryAll());
  return dispatch(fetchTasks(getState()));
};
