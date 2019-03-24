// @flow
import React from "react";

import { Button, Icon } from "./style";

type Props = {
  onClick: () => void,
  completed?: boolean
};

const ButtonComplete = ({ onClick, completed }: Props) => (
  <Button className={`${completed ? "completed" : ""}`} onClick={onClick}>
    <Icon className="icon-check" />
  </Button>
);

ButtonComplete.defaultProps = {
  completed: false
};

export default ButtonComplete;
