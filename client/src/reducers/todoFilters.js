const setVisibility = (current, next) => {
  if (current !== next) {
    return next;
  }
  return current;
};

const initialState = {
  category: undefined,
  searchText: undefined,
  visibility: "ONLY_TO_COMPLETE"
};

const todoFilters = (state = initialState, action) => {
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
