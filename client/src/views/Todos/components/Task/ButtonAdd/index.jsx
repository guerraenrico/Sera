import React from "react";
import PropTypes from "prop-types";

import { Button, Text, Icon } from "./style";

const ButtonAdd = ({ onClick, children, withMargin }) => (
  <Button onClick={onClick} withMargin={withMargin}>
    {children && <Text>{children}</Text>}
    <Icon className="icon-add" />
  </Button>
);

ButtonAdd.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string,
  withMargin: PropTypes.bool
};

ButtonAdd.defaultProps = {
  children: undefined,
  withMargin: false
};

export default ButtonAdd;
