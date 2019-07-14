import React from "react";
import PropTypes from "prop-types";
import OptionComponent from "./option";

import { Switch, Icon, Text } from "./style";

const SwitchComponent = ({ options, onOptionClick }) => (
  <Switch>
    {options.map(option => (
      <OptionComponent
        key={option.name}
        selected={option.selected}
        onClick={() => {
          onOptionClick(option.name);
        }}
        role="presentation"
      >
        {option.iconClassName && <Icon className={option.iconClassName} />}
        <Text>{option.text}</Text>
      </OptionComponent>
    ))}
  </Switch>
);

SwitchComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
      iconClassName: PropTypes.string,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onOptionClick: PropTypes.func.isRequired
};

export default SwitchComponent;
