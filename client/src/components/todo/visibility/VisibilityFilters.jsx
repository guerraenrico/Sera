import React from "react";
import PropTypes from "prop-types";
import VisibilitySwitch from "./VisibilitySwitch";

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

export default VisibilityFilter;
