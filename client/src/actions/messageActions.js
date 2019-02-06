// @flow

import {
  SHOW_MESSAGE_INFO,
  SHOW_MESSAGE_ERROR,
  HIDE_MESSAGE
} from "../constants/actionTypes";

export const showMessageInfo = (message: string): { type: string } => ({
  type: SHOW_MESSAGE_INFO,
  message
});

export const showMessageError = (message: string): { type: string } => ({
  type: SHOW_MESSAGE_ERROR,
  message
});

export const hideMessage = (): { type: string } => ({
  type: HIDE_MESSAGE
});
