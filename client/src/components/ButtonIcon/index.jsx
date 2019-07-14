import React from "react";
import PropTypes from "prop-types";

import { Button, Icon } from "./style";

const Small = "small";
const Normal = "normal";

const ButtonIcon = ({ onClick, iconClassName, size }) => (
  <Button onClick={onClick} size={size}>
    <Icon className={iconClassName} size={size} />
  </Button>
);

ButtonIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf([Small, Normal]),
  iconClassName: PropTypes.string.isRequired
};

ButtonIcon.defaultProps = {
  size: "normal"
};

export default ButtonIcon;
