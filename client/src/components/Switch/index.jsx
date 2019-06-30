// @flow
import React from "react";

import OptionComponent from "./option";

import { Switch, Icon, Text } from "./style";

type Option = {
  +name: string,
  +selected: boolean,
  +iconClassName: string,
  +text: String
};

type Props = {
  +option1: Option,
  +option2: Option,
  +onOptionClick: string => void
};

const SwitchComponent = ({ option1, option2, onOptionClick }: Props) => (
  <Switch>
    <OptionComponent
      selected={option1.selected}
      onClick={() => {
        onOptionClick(option1.name);
      }}
      role="presentation"
    >
      <Icon className={option1.iconClassName} />
      <Text>{option1.text}</Text>
    </OptionComponent>
    <OptionComponent
      selected={option2.selected}
      onClick={() => {
        onOptionClick(option2.name);
      }}
      role="presentation"
    >
      <Icon className={option2.iconClassName} />
      <Text>{option2.text}</Text>
    </OptionComponent>
  </Switch>
);

export default SwitchComponent;
