// @flow
import React from "react";
import PropTypes from "prop-types";

import Switch from "~/components/Switch";
import Strings from "~/styles/strings";
import { Container } from "./style";

const VisibilityComponent = ({ selectedFilter, onSwitch }) => (
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

VisibilityComponent.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  onSwitch: PropTypes.func.isRequired
};

export default VisibilityComponent;
