// @flow
import React from "react";

import { Button, Text } from "./style";

type Accent = "accent";
type Default = "default";

type Props = {
  +onClick: () => void,
  +color?: Default | Accent,
  +children?: string
};

const ButtonComponent = ({ onClick, color, children }: Props) => (
  <Button onClick={onClick} color={color}>
    {<Text color={color}>{children}</Text>}
  </Button>
);

ButtonComponent.defaultProps = {
  color: "default",
  children: ""
};

export default ButtonComponent;
