// @flow
import React from "react";

import { Button, Icon } from "./style";

type Props = {
  +onClick: () => void,
  iconClassName: string
};

const ButtonIcon = ({ onClick, iconClassName }: Props) => (
  <Button onClick={onClick}>
    <Icon className={iconClassName} />
  </Button>
);

export default ButtonIcon;
