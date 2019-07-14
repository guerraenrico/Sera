import React from "react";
import PropTypes from "prop-types";

import { Button, Icon } from "./style";

const ButtonComplete = ({ onClick, completed }) => (
  <Button className={`${completed ? "completed" : ""}`} onClick={onClick}>
    <Icon className="icon-check" />
  </Button>
);

ButtonComplete.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool
};

ButtonComplete.defaultProps = {
  completed: false
};

export default ButtonComplete;
