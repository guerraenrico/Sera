// @flow
import React from "react";

import { Button, Icon } from "./style";

type Props = {
  onClick: () => void
};

const ButtonClose = ({ onClick }: Props) => (
  <Button onClick={onClick}>
    <Icon className="icon-delete" />
  </Button>
);

export default ButtonClose;
