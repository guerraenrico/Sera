// @flow
import type { Category } from "../models/category";

export type AllTodo = "ALL_TODOS";
export type OnlyCompleted = "ONLY_COMPLETED";
export type OnlyToComplete = "ONLY_TO_COMPLETE";

export type Visibility = AllTodo | OnlyCompleted | OnlyToComplete;

export type SelectCategoryAction = {
  type: "SELECT_CATEGORY",
  category: Category
};
export type ClearSelectedCategoryAction = {
  type: "CLEAR_SELECTED_CATEGORY"
};
export type SwitchVisibilityFilterAction = {
  type: "SWITCH_VISIBILITY_FILTER",
  visibility: Visibility
};
export type SetSearchText = {
  type: "SET_SEARCH_TEXT",
  searchText: String
};

export type TodoFiltersAction =
  | SelectCategoryAction
  | ClearSelectedCategoryAction
  | SwitchVisibilityFilterAction;

export type TodoFiltersState = {
  +category?: Category,
  +searchText?: string,
  +visibility: Visibility
};

const setVisibility = (current: Visibility, next: Visibility): Visibility => {
  if (current !== next) {
    return next;
  }
  return current;
};

const initialState: TodoFiltersState = {
  category: undefined,
  searchText: undefined,
  visibility: "ONLY_TO_COMPLETE"
};

const todoFilters = (
  state: TodoFiltersState = initialState,
  action: TodoFiltersAction
) => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return {
        ...state,
        category: action.category
      };
    case "CLEAR_SELECTED_CATEGORY":
      return {
        ...state,
        category: undefined
      };
    case "SWITCH_VISIBILITY_FILTER":
      return {
        ...state,
        visibility: setVisibility(state.visibility, action.visibility)
      };
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
};

export default todoFilters;
