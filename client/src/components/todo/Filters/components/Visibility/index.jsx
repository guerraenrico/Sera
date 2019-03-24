// @flow
import React from "react";
import { connect } from "react-redux";

import Switch from "../../../../layout/Switch";

import * as todoFiltersActions from "../../../../../actions/todoFiltersActions";
import * as todoFiltersSelectors from "../../../../../selectors/todoFiltersSelectors";

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

const mapStateToProps = state => ({
  selectedFilter: todoFiltersSelectors.getVisibilityFilter(state)
});

const mapDispatchToProps = dispatch => ({
  onSwitch: visibility => {
    dispatch(todoFiltersActions.changeVisibility(visibility));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibilityComponent);
