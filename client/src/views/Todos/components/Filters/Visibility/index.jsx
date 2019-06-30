// @flow
import React from "react";

import Switch from "~/components/Switch";

import { Container } from "./style";

type Props = {
  selectedFilter: string,
  onSwitch: string => void
};

const VisibilityComponent = ({ selectedFilter, onSwitch }: Props) => (
  <Container>
    <Switch
      option1={{
        name: "ONLY_TO_COMPLETE",
        selected:
          selectedFilter === "ONLY_TO_COMPLETE" ||
          selectedFilter === "ALL_TODOS",
        iconClassName: "icon-circle-border"
      }}
      option2={{
        name: "ONLY_COMPLETED",
        selected:
          selectedFilter === "ONLY_COMPLETED" || selectedFilter === "ALL_TODOS",
        iconClassName: "icon-circle"
      }}
      onOptionClick={onSwitch}
      role="presentation"
    />
  </Container>
);

export default VisibilityComponent;
