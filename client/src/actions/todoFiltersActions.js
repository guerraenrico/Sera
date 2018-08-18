import { callApi, Methods } from '../utils/ApiUtils';
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

export const fetchAllCategories = (limit = queryItemsLimit, skip = 0) => (dispatch, getState) => {
  dispatch(requestFetchAllCategories());
  const request = callApi('categories', { limit, skip }, Methods.GET);
  return request.then(
    (response) => {
      if (response.success) {
        dispatch(receiveFetchAllCategories(response.data));
        dispatch(fetchTasksByCategory(getSelectedCategoriesId(getState())));
      } else {
        dispatch(errorFetchAllCategories(response.messageError));
      }
    },
    error => (
      dispatch(showMessageError(error.message))
    ),
  );
};

export const deleteCategory = (categoryId = '') => (dispatch, getState) => {
  const request = callApi('categories', categoryId, Methods.DELETE);
  return request.then(
    (response) => {
      if (response.success) {
        const { categories } = getState().todoFilters;
        const categoryIndex = categories.findIndex(category => category.id === categoryId);
        dispatch(removeCategoryLocal(categoryIndex));
      } else {
        dispatch(showMessageError(response.messageError));
      }
    },
    error => (
      dispatch(showMessageError(error.message))
    ),
  );
};

/**
 * Request to add a category
 * @param {String} name category name to add
 * @param {Function} callback function that need to handle the category created
 */
export const addCategory = (name = '', callback = undefined) => (dispatch) => {
  const request = callApi('categories', { name }, Methods.POST);
  return request.then(
    (response) => {
      if (response.success) {
        dispatch(addCategoryLocal(response.data));
        if (callback !== undefined) {
          callback(response.data);
        }
      } else {
        dispatch(showMessageError(response.messageError));
      }
    },
    error => (
      dispatch(showMessageError(error.message))
    ),
  );
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
