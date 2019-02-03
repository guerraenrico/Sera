import React from "react";
import PropTypes from "prop-types";

const ButtonCompleteTask = ({ onClick, completed }) => (
  <button
    className={`button-complete-task ${
      completed ? "button-completed-task" : ""
    }`}
    onClick={onClick}
  >
    <i className="icon-check" />
  </button>
);

ButtonCompleteTask.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool
};

ButtonCompleteTask.defaultProps = {
  completed: false
};

export default ButtonCompleteTask;
