// @flow
import React from "react";

import { Input } from "./style";

type Small = "small";
type Normal = "normal";
type Large = "large";

type Props = {
  +size?: Small | Normal | Large
};

const InputComponent = ({ size, ...props }: Props) => (
  <Input size={size} {...props} />
);

InputComponent.defaultProps = {
  size: "normal"
};

export default InputComponent;
