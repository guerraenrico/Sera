import { createSelector } from "reselect";

export const isFetchingCategoriesFilter = state => state.todoFilters.isFetching;
export const getTodoFilters = state => state.todoFilters;
export const getCategoryFilter = state => state.todoFilters.category;
export const getVisibilityFilter = state => state.todoFilters.visibility;

export const visibilityOnlyCompleted = createSelector(
  getVisibilityFilter,
  visibility => visibility === "ONLY_COMPLETED"
);

export const getSelectedCategoryId = createSelector(
  getCategoryFilter,
  category => category && category.id
);
