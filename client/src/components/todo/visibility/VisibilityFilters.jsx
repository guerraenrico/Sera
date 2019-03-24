import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VisibilitySwitch from "./VisibilitySwitch";

import * as todoFiltersActions from "../../../actions/todoFiltersActions";
import * as todoFiltersSelectors from "../../../selectors/todoFiltersSelectors";

const VisibilityFilter = ({
  selectedVisibilityFilter,
  onVisibilitySwitchClick
}) => (
  <div className="visibility-filter-wrapper">
    <VisibilitySwitch
      selected={
        selectedVisibilityFilter === "ONLY_TO_COMPLETE" ||
        selectedVisibilityFilter === "ALL_TODOS"
      }
      onClick={onVisibilitySwitchClick("ONLY_TO_COMPLETE")}
      role="presentation"
    >
      <i className="icon-circle-border" />
    </VisibilitySwitch>
    <VisibilitySwitch
      selected={
        selectedVisibilityFilter === "ONLY_COMPLETED" ||
        selectedVisibilityFilter === "ALL_TODOS"
      }
      onClick={onVisibilitySwitchClick("ONLY_COMPLETED")}
      role="presentation"
    >
      <i className="icon-circle" />
    </VisibilitySwitch>
  </div>
);

VisibilityFilter.propTypes = {
  selectedVisibilityFilter: PropTypes.string.isRequired,
  onVisibilitySwitchClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedVisibilityFilter: todoFiltersSelectors.getVisibilityFilter(state)
});

const mapDispatchToProps = dispatch => ({
  onVisibilitySwitchClick: visibility => () =>
    dispatch(todoFiltersActions.changeVisibility(visibility))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibilityFilter);
