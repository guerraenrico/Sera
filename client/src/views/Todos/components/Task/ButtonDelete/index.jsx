// @flow
import React from "react";
import PropTypes from "prop-types";

import { Button, Icon } from "./style";

const ButtonDelete = ({ onClick }) => (
  <Button onClick={onClick}>
    <Icon className="icon-delete" />
  </Button>
);

ButtonDelete.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ButtonDelete;
