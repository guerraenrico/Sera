// @flow
import React from "react";

import OptionComponent from "./option";

import { Switch, Icon, Text } from "./style";

type Option = {
  +name: string,
  +selected: boolean,
  +iconClassName?: string,
  +text: String
};

type Props = {
  +options: Array<Option>,
  +onOptionClick: string => void
};

const SwitchComponent = ({ options, onOptionClick }: Props) => (
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

export default SwitchComponent;
