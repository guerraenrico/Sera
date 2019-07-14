import React from "react";
import PropTypes from "prop-types";

import { Button, Text } from "./style";

const Accent = "accent";
const Default = "default";

const ButtonComponent = ({ onClick, color, children }) => (
  <Button onClick={onClick} color={color}>
    {<Text color={color}>{children}</Text>}
  </Button>
);

ButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf([Accent, Default]),
  children: PropTypes.string
};

ButtonComponent.defaultProps = {
  color: "default",
  children: ""
};

export default ButtonComponent;
