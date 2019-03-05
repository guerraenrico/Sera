// @flow
import React from "react";
import PropTypes from "prop-types";

import { Button, Icon } from "./style";

type Props = {
  onClick: () => void
};

const ButtonDeleteCategory = ({ onClick }: Props) => (
  <Button onClick={onClick}>
    <Icon className="icon-delete" />
  </Button>
);

ButtonDeleteCategory.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ButtonDeleteCategory;
