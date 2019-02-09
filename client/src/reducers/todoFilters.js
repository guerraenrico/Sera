// @flow
import { categoryAll } from "../models/category";
import type { Category } from "../models/category";

export type AllTodo = "ALL_TODOS";
export type OnlyCompleted = "ONLY_COMPLETED";
export type OnlyToComplete = "ONLY_TO_COMPLETE";

export type Visibility = AllTodo | OnlyCompleted | OnlyToComplete;

export type RequestFetchAllCategoriesAction = {
  type: "REQUEST_FETCH_ALL_CATEGORIES"
};
export type ReceiveFetchAllCategoriesAction = {
  type: "RECEIVE_FETCH_ALL_CATEGORIES",
  categories: Array<Category>
};
export type ErrorFetchAllCategoriesAction = {
  type: "ERROR_FETCH_ALL_CATEGORIES",
  error: string
};
export type AddCategoyLocalAction = {
  type: "ADD_CATEGORY_LOCAL",
  category: Category
};
export type RemoveCategoryAction = {
  type: "REMOVE_CATEGORY_LOCAL",
  categoryIndex: number
};
export type ToggleSelectCategoryAction = {
  type: "TOGGLE_SELECT_CATEGORY",
  selectedCategory: Category
};
export type ToggleSelectCategoryAllAction = {
  type: "TOGGLE_SELECT_CATEGORY_ALL"
};
export type SwitchVisibilityFilterAction = {
  type: "SWITCH_VISIBILITY_FILTER",
  visibility: Visibility
};

export type TodoFiltersAction =
  | RequestFetchAllCategoriesAction
  | ReceiveFetchAllCategoriesAction
  | ErrorFetchAllCategoriesAction
  | AddCategoyLocalAction
  | RemoveCategoryAction
  | ToggleSelectCategoryAction
  | ToggleSelectCategoryAllAction
  | SwitchVisibilityFilterAction;

export type TodoFiltersState = {
  +isFetching: boolean,
  +categories: Array<Category>,
  +visibility: Visibility,
  +error: string
};

const setVisibility = (current: Visibility, next: Visibility): Visibility => {
  if (current !== next) {
    return next;
  }
  return current;
};

const initialState: TodoFiltersState = {
  isFetching: false,
  categories: [
    {
      ...categoryAll,
      selected: true
    }
  ],
  visibility: "ONLY_TO_COMPLETE",
  error: ""
};

const todoFilters = (
  state: TodoFiltersState = initialState,
  action: TodoFiltersAction
) => {
  switch (action.type) {
    case "REQUEST_FETCH_ALL_CATEGORIES":
      return {
        ...state,
        isFetching: true
      };
    case "RECEIVE_FETCH_ALL_CATEGORIES":
      return {
        ...state,
        isFetching: false,
        categories: [
          {
            ...categoryAll,
            selected: true
          },
          ...action.categories.map<Category>((category: Category) => ({
            ...category,
            selected: false
          }))
        ]
      };
    case "ERROR_FETCH_ALL_CATEGORIES":
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case "ADD_CATEGORY_LOCAL":
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            ...action.category,
            selected: false
          }
        ]
      };
    case "REMOVE_CATEGORY_LOCAL":
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, action.categoryIndex),
          ...state.categories.slice(action.categoryIndex + 1)
        ]
      };
    case "TOGGLE_SELECT_CATEGORY":
      return {
        ...state,
        isFetching: false,
        categories: state.categories.map<Category>((category: Category) => {
          if (category.id !== action.selectedCategory.id) {
            if (category.id === categoryAll.id) {
              return {
                ...category,
                selected: false
              };
            }
            return category;
          }
          return {
            ...category,
            selected: !category.selected
          };
        })
      };
    case "TOGGLE_SELECT_CATEGORY_ALL":
      return {
        ...state,
        isFetching: false,
        categories: state.categories.map<Category>((category: Category) => {
          if (category.id === categoryAll.id) {
            return {
              ...category,
              selected: !category.selected
            };
          }
          return {
            ...category,
            selected: false
          };
        })
      };
    case "SWITCH_VISIBILITY_FILTER":
      return {
        ...state,
        visibility: setVisibility(state.visibility, action.visibility)
      };
    default:
      return state;
  }
};

export default todoFilters;
