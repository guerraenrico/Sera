import React from "react";
import PropTypes from "prop-types";

import { Input } from "./style";

const Small = "small";
const Normal = "normal";
const Large = "large";

const InputComponent = ({ size, ...props }) => <Input size={size} {...props} />;

InputComponent.propTypes = {
  size: PropTypes.oneOf([Small, Normal, Large])
};

InputComponent.defaultProps = {
  size: "normal"
};

export default InputComponent;
