// @flow
import { callApi, Methods } from "../utils/ApiUtils";
import { shouldRefreshToken } from "../utils/RequestUtils";
import { refreshAccessToken } from "./authActions";

// import { queryItemsLimit } from "../constants/config";
import { fetchTasksByCategory } from "./todoTasksActions";
import { showMessageError } from "./messageActions";
import {
  getSelectedCategoryId,
  visibilityOnlyCompleted
} from "../selectors/todoFiltersSelectors";

import type {
  SelectCategoryAction,
  ClearSelectedCategoryAction,
  SwitchVisibilityFilterAction,
  Visibility
} from "../reducers/todoFilters";

import type { Category } from "../models/category";
import type { ThunkAction } from "../reducers";

const fetchTasks = (state): ThunkAction =>
  fetchTasksByCategory(
    getSelectedCategoryId(state),
    visibilityOnlyCompleted(state)
  );

const selectCategory = (category: Category): SelectCategoryAction => ({
  type: "SELECT_CATEGORY",
  category
});

const clearSelectedCategory = (): ClearSelectedCategoryAction => ({
  type: "CLEAR_SELECTED_CATEGORY"
});

const switchVisibilityFilter = (
  visibility: Visibility
): SwitchVisibilityFilterAction => ({
  type: "SWITCH_VISIBILITY_FILTER",
  visibility
});

// export const fetchAllCategories = (
//   limit: number = queryItemsLimit,
//   skip: number = 0
// ): ThunkAction => async (dispatch, getState) => {
//   dispatch(requestFetchAllCategories());
//   try {
//     const { accessToken } = getState().auth;
//     const response = await callApi(
//       "categories",
//       { limit, skip },
//       Methods.GET,
//       accessToken
//     );
//     if (response.success) {
//       dispatch(receiveFetchAllCategories(response.data));
//       dispatch(fetchTasksByCategory(getSelectedCategoriesId(getState())));
//     } else {
//       if (shouldRefreshToken(response)) {
//         await dispatch(refreshAccessToken());
//         dispatch(fetchAllCategories(limit, skip));
//         return;
//       }
//       dispatch(errorFetchAllCategories(response.error.message));
//       dispatch(showMessageError(response.error.message));
//     }
//   } catch (error) {
//     dispatch(showMessageError(error.message));
//   }
// };

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
      // const { categories } = getState().todoFilters;
      // const categoryIndex = categories.findIndex(
      //   category => category.id === categoryId
      // );
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
  callback: Category => void
): ThunkAction => async (dispatch, getState) => {
  try {
    const { accessToken, guest } = getState().auth;
    if (guest) {
      if (callback !== undefined) {
        callback({
          id: new Date().getTime().toString(),
          name,
          userId: "guest",
          selected: false
        });
      }
      return;
    }
    const response = await callApi(
      "categories",
      { name },
      Methods.POST,
      accessToken
    );
    if (response.success) {
      const category = response.data;
      if (callback !== undefined) {
        callback(category);
      }
      return;
    }
    if (shouldRefreshToken(response)) {
      await dispatch(refreshAccessToken());
      dispatch(addCategory(name, callback));
      return;
    }
    dispatch(showMessageError(response.error.message));
  } catch (error) {
    dispatch(showMessageError(error.message));
  }
};

export const searchCategory = (
  text: string,
  callback: (Array<Category>) => void
): ThunkAction => async (dispatch, getState) => {
  try {
    const { accessToken, guest } = getState().auth;
    if (guest) {
      dispatch(showMessageError("Not available in guest mode"));
      return;
    }
    const response = await callApi(
      "categories/search",
      { text },
      Methods.GET,
      accessToken
    );
    if (response.success) {
      const categories = response.data;
      if (callback !== undefined) {
        callback(categories);
      }
      return;
    }
    if (shouldRefreshToken(response)) {
      await dispatch(refreshAccessToken());
      dispatch(searchCategory(text, callback));
      return;
    }
    dispatch(showMessageError(response.error.message));
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

export const setSelectedCategory = (category: Category): ThunkAction => (
  dispatch,
  getState
) => {
  dispatch(selectCategory(category));
  dispatch(fetchTasks(getState()));
};

export const cleanSelectedCategory = (): ThunkAction => (
  dispatch,
  getState
) => {
  dispatch(clearSelectedCategory());
  dispatch(fetchTasks(getState()));
};
