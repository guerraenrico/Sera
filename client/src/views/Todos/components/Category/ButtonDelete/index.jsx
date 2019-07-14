import React from "react";
import PropTypes from "prop-types";

import { Button, Icon } from "./style";

const ButtonDeleteCategory = ({ onClick }) => (
  <Button onClick={onClick}>
    <Icon className="icon-delete" />
  </Button>
);

ButtonDeleteCategory.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ButtonDeleteCategory;
