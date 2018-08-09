import { createSelector } from 'reselect';
import { isFetchingCategoriesFilter } from './todoFiltersSelectors';
import { isFetchingTasks } from './tasksSelectors';

export const showLoading = createSelector(
  isFetchingCategoriesFilter,
  isFetchingTasks,
  (isFetchingCategories, isFetchingTodos) => isFetchingCategories || isFetchingTodos,
);

export default showLoading;
