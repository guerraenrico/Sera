import React from "react";
import PropTypes from "prop-types";

import SnackbarAnim from "./anim";
import { Snackbar, Message, Action } from "./style";

const ActionComponent = ({ onClick, text }) => (
  <Action onClick={onClick}>{text}</Action>
);

ActionComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

class SnackbarComponent extends React.PureComponent {
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
        customClass={
          verticalPostion !== undefined && horizontalPosition !== undefined
            ? `${verticalPostion} ${horizontalPosition}`
            : ""
        }
      >
        <Snackbar className={`${isError ? "error" : ""}`}>
          <Message>{message}</Message>
          {actionText !== "" && actionClick !== undefined && (
            <ActionComponent
              onClick={actionClick}
              text={actionText !== undefined ? actionText : ""}
            />
          )}
        </Snackbar>
      </SnackbarAnim>
    );
  }
}

SnackbarComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  isError: PropTypes.bool,
  actionText: PropTypes.string,
  actionClick: PropTypes.func,
  verticalPostion: PropTypes.string,
  horizontalPosition: PropTypes.string
};

export default SnackbarComponent;
