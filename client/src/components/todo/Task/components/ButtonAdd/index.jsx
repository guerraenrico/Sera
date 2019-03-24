// @flow
import React from "react";

import { Button, Text, Icon } from "./style";

type Props = {
  +onClick: () => void,
  +children?: string,
  +withMargin?: boolean
};

const ButtonAdd = ({ onClick, children, withMargin }: Props) => (
  <Button onClick={onClick} withMargin={withMargin}>
    {children && <Text>{children}</Text>}
    <Icon className="icon-add" />
  </Button>
);

ButtonAdd.defaultProps = {
  children: undefined,
  withMargin: false
};

export default ButtonAdd;
