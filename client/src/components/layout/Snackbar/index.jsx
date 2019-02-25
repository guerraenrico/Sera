// @flow

import React from "react";
import SnackbarAnim from "../../anims/SnackbarAnim";

import { SnackbarContainer, Snackbar, Message, Action } from "./style";

type ActionProps = {
  +text: string,
  +onClick: () => void
};

const ActionComponent = ({ onClick, text }: ActionProps) => (
  <Action onClick={onClick}>{text}</Action>
);

type SnackbarProps = {
  +show: boolean,
  +message: string,
  +onClose: () => void,
  +duration?: number,
  +isError?: boolean,
  +actionText?: string,
  +actionClick?: void,
  +verticalPostion?: string,
  +horizontalPosition?: string
};

class SnackbarComponent extends React.Component<SnackbarProps> {
  static defaultProps = {
    duration: 5000,
    isError: false,
    actionText: "",
    actionClick: undefined,
    verticalPostion: "bottom",
    horizontalPosition: "right"
  };

  componentDidUpdate() {
    const { onClose, duration, show } = this.props;

    if (show) {
      setTimeout(() => {
        onClose();
      }, duration);
    }
  }

  render() {
    const {
      message,
      isError,
      actionText,
      actionClick,
      show,
      verticalPostion,
      horizontalPosition
    } = this.props;
    return (
      <SnackbarAnim
        in={show}
        customClass={`${verticalPostion} ${horizontalPosition}`}
      >
        <Snackbar className={`${isError ? "error" : ""}`}>
          <Message>{message}</Message>
          {actionText !== "" && actionClick !== undefined && (
            <ActionComponent onClick={actionClick} text={actionText} />
          )}
        </Snackbar>
      </SnackbarAnim>
    );
  }
}

export default SnackbarComponent;
