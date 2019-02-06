// @flow
import { callApi, Methods } from "../utils/ApiUtils";
import { shouldRefreshToken } from "../utils/RequestUtils";
import { refreshAccessToken } from "./authActions";
import {
  REQUEST_FETCH_ALL_CATEGORIES,
  RECEIVE_FETCH_ALL_CATEGORIES,
  ERROR_FETCH_ALL_CATEGORIES,
  ADD_CATEGORY_LOCAL,
  REMOVE_CATEGORY_LOCAL,
  TOOGLE_SELECT_CATEGORY,
  TOOGLE_SELECT_CATEGORY_ALL,
  SWITCH_VISIBILITY_FILTER
} from "../constants/actionTypes";
import { queryItemsLimit } from "../constants/config";
import { fetchTasksByCategory } from "./todoTasksActions";
import { showMessageError } from "./messageActions";
import {
  getSelectedCategoriesId,
  visibilityOnlyCompleted
} from "../selectors/todoFiltersSelectors";

const fetchTasks = state =>
  fetchTasksByCategory(
    getSelectedCategoriesId(state),
    visibilityOnlyCompleted(state)
  );

const requestFetchAllCategories = (): { type: string } => ({
  type: REQUEST_FETCH_ALL_CATEGORIES
});

const receiveFetchAllCategories = (categories: []): { type: string } => ({
  type: RECEIVE_FETCH_ALL_CATEGORIES,
  categories
});

const errorFetchAllCategories = (error: string): { type: string } => ({
  type: ERROR_FETCH_ALL_CATEGORIES,
  error
});

const addCategoryLocal = (category: {}): { type: string } => ({
  type: ADD_CATEGORY_LOCAL,
  category
});

const removeCategoryLocal = (categoryIndex: number): { type: string } => ({
  type: REMOVE_CATEGORY_LOCAL,
  categoryIndex
});

const toogleSelectCategory = (selectedCategory: {}): { type: string } => ({
  type: TOOGLE_SELECT_CATEGORY,
  selectedCategory
});

const toogleSelectCategoryAll = (): { type: string } => ({
  type: TOOGLE_SELECT_CATEGORY_ALL
});

const switchVisibilityFilter = visibility => ({
  type: SWITCH_VISIBILITY_FILTER,
  visibility
});

export const fetchAllCategories = (
  limit: number = queryItemsLimit,
  skip: number = 0
) => async (
  dispatch: ({}) => void,
  getState: () => { auth: { accessToken: string } }
) => {
  dispatch(requestFetchAllCategories());
  try {
    const { accessToken } = getState().auth;
    const response = await callApi(
      "categories",
      { limit, skip },
      Methods.GET,
      accessToken
    );
    if (response.success) {
      dispatch(receiveFetchAllCategories(response.data));
      dispatch(fetchTasksByCategory(getSelectedCategoriesId(getState())));
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        dispatch(fetchAllCategories(limit, skip));
        return;
      }
      dispatch(errorFetchAllCategories(response.error.message));
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const deleteCategory = (categoryId: string = "") => async (
  dispatch: ({}) => void,
  getState: () => {
    auth: { accessToken: string },
    todoFilters: { categories: [] }
  }
) => {
  try {
    const { accessToken } = getState().auth;
    const response = await callApi(
      "categories",
      categoryId,
      Methods.DELETE,
      accessToken
    );
    if (response.success) {
      const { categories } = getState().todoFilters;
      const categoryIndex = categories.findIndex(
        category => category.id === categoryId
      );
      dispatch(removeCategoryLocal(categoryIndex));
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        dispatch(deleteCategory(categoryId));
        return;
      }
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
export const addCategory = (
  name: string = "",
  callback: ({}) => void
) => async (
  dispatch: ({}) => void,
  getState: () => { auth: { accessToken: string } }
) => {
  try {
    const { accessToken } = getState().auth;
    const response = await callApi(
      "categories",
      { name },
      Methods.POST,
      accessToken
    );
    if (response.success) {
      const category = response.data;
      dispatch(addCategoryLocal(category));
      if (callback !== undefined) {
        callback(category);
      }
    } else {
      if (shouldRefreshToken(response)) {
        await dispatch(refreshAccessToken());
        dispatch(addCategory(name, callback));
        return;
      }
      dispatch(showMessageError(response.error.message));
    }
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const changeVisibility = (visibility: string) => (
  dispatch: ({}) => void,
  getState: () => {}
) => {
  dispatch(switchVisibilityFilter(visibility));
  return dispatch(fetchTasks(getState()));
};

export const selectCategory = (selectedCategory: {}) => (
  dispatch: ({}) => void,
  getState: () => {}
) => {
  dispatch(toogleSelectCategory(selectedCategory));
  return dispatch(fetchTasks(getState()));
};

export const selectCategoryAll = () => (
  dispatch: ({}) => void,
  getState: () => {}
) => {
  dispatch(toogleSelectCategoryAll());
  return dispatch(fetchTasks(getState()));
};
