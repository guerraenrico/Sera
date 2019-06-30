// @flow
import React from "react";
import type { Node } from "react";

import { Option } from "./style";

type Props = {
  +selected: boolean,
  +children: Node,
  +onClick: () => void
};

const OptionComponent = ({ selected, children, onClick }: Props) => (
  <Option
    className={`${selected ? "selected" : ""} `}
    onClick={onClick}
    role="presentation"
  >
    {children}
  </Option>
);

export default OptionComponent;
