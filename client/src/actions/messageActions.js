// @flow

import type {
  ShowMessageInfoAction,
  ShowMessageErrorAction,
  HideMessageAction
} from "../reducers/message";

export const showMessageInfo = (message: string): ShowMessageInfoAction => ({
  type: "SHOW_MESSAGE_INFO",
  message
});

export const showMessageError = (message: string): ShowMessageErrorAction => ({
  type: "SHOW_MESSAGE_ERROR",
  message
});

export const hideMessage = (): HideMessageAction => ({
  type: "HIDE_MESSAGE"
});
