import React from "react";
import PropTypes from "prop-types";

import { Option } from "./style";

const OptionComponent = ({ selected, children, onClick }) => (
  <Option
    className={`${selected ? "selected" : ""} `}
    onClick={onClick}
    role="presentation"
    selected={selected}
  >
    {children}
  </Option>
);

OptionComponent.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default OptionComponent;
