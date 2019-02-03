import { createSelector } from "reselect";
import { isFetchingCategoriesFilter } from "./todoFiltersSelectors";
import { isFetchingTasks } from "./todoTasksSelectors";

export const showLoading = createSelector(
  isFetchingCategoriesFilter,
  isFetchingTasks,
  (isFetchingCategories, isFetchingTodos) =>
    isFetchingCategories || isFetchingTodos
);

export default showLoading;
