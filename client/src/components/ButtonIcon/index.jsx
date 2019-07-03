// @flow
import React from "react";

import { Button, Icon } from "./style";

type Small = "small";
type Normal = "normal";

type Props = {
  +onClick: () => void,
  size?: Normal | Small,
  iconClassName: string
};

const ButtonIcon = ({ onClick, iconClassName, size }: Props) => (
  <Button onClick={onClick} size={size}>
    <Icon className={iconClassName} size={size} />
  </Button>
);

ButtonIcon.defaultProps = {
  size: "normal"
};

export default ButtonIcon;
