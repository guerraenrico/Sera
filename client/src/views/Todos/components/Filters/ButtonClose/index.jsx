import React from "react";
import PropTypes from "prop-types";

import { Button, Icon } from "./style";

const ButtonClose = ({ onClick }) => (
  <Button onClick={onClick}>
    <Icon className="icon-delete" />
  </Button>
);

ButtonClose.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ButtonClose;
