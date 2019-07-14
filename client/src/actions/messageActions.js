export const showMessageInfo = (message = "") => ({
  type: "SHOW_MESSAGE_INFO",
  message
});

export const showMessageError = (message = "") => ({
  type: "SHOW_MESSAGE_ERROR",
  message
});

export const hideMessage = () => ({
  type: "HIDE_MESSAGE"
});
