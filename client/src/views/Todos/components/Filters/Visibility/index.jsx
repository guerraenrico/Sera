// @flow
import React from "react";
import Switch from "~/components/Switch";
import { Container } from "./style";
import Strings from "~/styles/strings";

type Props = {
  selectedFilter: string,
  onSwitch: string => void
};

const VisibilityComponent = ({ selectedFilter, onSwitch }: Props) => (
  <Container>
    <Switch
      options={[
        {
          name: "ONLY_TO_COMPLETE",
          selected:
            selectedFilter === "ONLY_TO_COMPLETE" ||
            selectedFilter === "ALL_TODOS",
          iconClassName: "icon-circle-border",
          text: Strings().filterVisibilityToComplete
        },
        {
          name: "ONLY_COMPLETED",
          selected:
            selectedFilter === "ONLY_COMPLETED" ||
            selectedFilter === "ALL_TODOS",
          iconClassName: "icon-circle",
          text: Strings().filterVisibilityCompleted
        }
      ]}
      onOptionClick={onSwitch}
      role="presentation"
    />
  </Container>
);

export default VisibilityComponent;
