const initialState = {
  show: false,
  isError: false,
  text: ""
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MESSAGE_INFO":
      return {
        ...state,
        show: true,
        isError: false,
        text: action.message
      };
    case "SHOW_MESSAGE_ERROR":
      return {
        ...state,
        show: true,
        isError: true,
        text: action.message
      };
    case "HIDE_MESSAGE":
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
};

export default message;
