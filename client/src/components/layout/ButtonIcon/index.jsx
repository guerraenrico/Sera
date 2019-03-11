// @flow
import React from "react";

import { Button, Icon } from "./style";

type Props = {
  +onClick: () => void,
  className: string
};

const ButtonIcon = ({ onClick, className }: Props) => (
  <Button onClick={onClick}>
    <Icon className={className} />
  </Button>
);

export default ButtonIcon;
