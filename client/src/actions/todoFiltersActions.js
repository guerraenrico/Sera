// @flow
import { callApi, Methods } from "../utils/ApiUtils";
import { shouldRefreshToken } from "../utils/RequestUtils";
import { refreshAccessToken } from "./authActions";

import { queryItemsLimit } from "../constants/config";
import { fetchTasksByCategory } from "./todoTasksActions";
import { showMessageError } from "./messageActions";
import {
  getSelectedCategoriesId,
  visibilityOnlyCompleted
} from "../selectors/todoFiltersSelectors";

import type {
  RequestFetchAllCategoriesAction,
  ReceiveFetchAllCategoriesAction,
  ErrorFetchAllCategoriesAction,
  AddCategoyLocalAction,
  RemoveCategoryAction,
  ToggleSelectCategoryAction,
  ToggleSelectCategoryAllAction,
  SwitchVisibilityFilterAction,
  Visibility
} from "../reducers/todoFilters";

import type { Category } from "../models/category";
import type { ThunkAction } from "../reducers";

const fetchTasks = (state): ThunkAction =>
  fetchTasksByCategory(
    getSelectedCategoriesId(state),
    visibilityOnlyCompleted(state)
  );

const requestFetchAllCategories = (): RequestFetchAllCategoriesAction => ({
  type: "REQUEST_FETCH_ALL_CATEGORIES"
});

const receiveFetchAllCategories = (
  categories: Array<Category>
): ReceiveFetchAllCategoriesAction => ({
  type: "RECEIVE_FETCH_ALL_CATEGORIES",
  categories
});

const errorFetchAllCategories = (
  error: string
): ErrorFetchAllCategoriesAction => ({
  type: "ERROR_FETCH_ALL_CATEGORIES",
  error
});

const addCategoryLocal = (category: Category): AddCategoyLocalAction => ({
  type: "ADD_CATEGORY_LOCAL",
  category
});

const removeCategoryLocal = (categoryIndex: number): RemoveCategoryAction => ({
  type: "REMOVE_CATEGORY_LOCAL",
  categoryIndex
});

const toogleSelectCategory = (
  selectedCategory: Category
): ToggleSelectCategoryAction => ({
  type: "TOGGLE_SELECT_CATEGORY",
  selectedCategory
});

const toogleSelectCategoryAll = (): ToggleSelectCategoryAllAction => ({
  type: "TOGGLE_SELECT_CATEGORY_ALL"
});

const switchVisibilityFilter = (
  visibility: Visibility
): SwitchVisibilityFilterAction => ({
  type: "SWITCH_VISIBILITY_FILTER",
  visibility
});

export const fetchAllCategories = (
  limit: number = queryItemsLimit,
  skip: number = 0
): ThunkAction => async (dispatch, getState) => {
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

export const deleteCategory = (categoryId: string = ""): ThunkAction => async (
  dispatch,
  getState
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
): ThunkAction => async (dispatch, getState) => {
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

export const changeVisibility = (visibility: Visibility): ThunkAction => (
  dispatch,
  getState
) => {
  dispatch(switchVisibilityFilter(visibility));
  return dispatch(fetchTasks(getState()));
};

export const selectCategory = (selectedCategory: Category): ThunkAction => (
  dispatch,
  getState
) => {
  dispatch(toogleSelectCategory(selectedCategory));
  return dispatch(fetchTasks(getState()));
};

export const selectCategoryAll = (): ThunkAction => (dispatch, getState) => {
  dispatch(toogleSelectCategoryAll());
  return dispatch(fetchTasks(getState()));
};
