// @flow
export type ShowMessageInfoAction = {
  type: "SHOW_MESSAGE_INFO",
  message: string
};
export type ShowMessageErrorAction = {
  type: "SHOW_MESSAGE_ERROR",
  message: string
};
export type HideMessageAction = { type: "HIDE_MESSAGE" };

export type MessageAction =
  | ShowMessageInfoAction
  | ShowMessageErrorAction
  | HideMessageAction;
export type MessageState = { +show: boolean, +isError: boolean, +text: string };

const initialState: MessageState = {
  show: false,
  isError: false,
  text: ""
};

const message = (state: MessageState = initialState, action: MessageAction) => {
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
