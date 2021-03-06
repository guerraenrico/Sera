// @flow
import { callApi, Methods } from "../utils/ApiUtils";
import { shouldRefreshToken } from "../utils/RequestUtils";
import { refreshAccessToken } from "./authActions";

// import { queryItemsLimit } from "../constants/config";
import { fetchTasksByCategory, searchTask } from "./todoTasksActions";
import { showMessageError } from "./messageActions";
import {
  getSelectedCategoryId,
  visibilityOnlyCompleted
} from "../selectors/todoFiltersSelectors";

const fetchTasks = () => (dispatch, getState) => {
  dispatch(
    fetchTasksByCategory(
      getSelectedCategoryId(getState()),
      visibilityOnlyCompleted(getState())
    )
  );
};

const selectCategory = category => ({
  type: "SELECT_CATEGORY",
  category
});

const clearSelectedCategory = () => ({
  type: "CLEAR_SELECTED_CATEGORY"
});

const switchVisibilityFilter = visibility => ({
  type: "SWITCH_VISIBILITY_FILTER",
  visibility
});

const setSearchText = searchText => ({
  type: "SET_SEARCH_TEXT",
  searchText
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

export const deleteCategory = (categoryId = "") => async (
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
export const addCategory = (name = "", callback) => async (
  dispatch,
  getState
) => {
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

export const searchCategory = (text, callback) => async (
  dispatch,
  getState
) => {
  try {
    const { accessToken, guest } = getState().auth;
    if (guest) {
      dispatch(showMessageError("Operation not available in guest mode"));
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

export const changeVisibility = visibility => dispatch => {
  dispatch(switchVisibilityFilter(visibility));
  return dispatch(fetchTasks());
};

export const setSelectedCategory = category => dispatch => {
  dispatch(selectCategory(category));
  dispatch(fetchTasks());
};

export const cleanSelectedCategory = () => dispatch => {
  dispatch(clearSelectedCategory());
  dispatch(fetchTasks());
};

export const setTaskSearchText = text => dispatch => {
  dispatch(setSearchText(text));
  dispatch(searchTask(text));
};

export const cleanTaskSearchText = () => dispatch => {
  dispatch(setSearchText("text"));
  dispatch(fetchTasks());
};
