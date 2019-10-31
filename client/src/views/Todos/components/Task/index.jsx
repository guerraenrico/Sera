// @flow
import React from "react";
import PropTypes from "prop-types";

import EditableTaskComponent from "./editable";
import StaticTaskComponent from "./static";

class TaskComponent extends React.PureComponent {
  static defaultProps = {
    onUndo: () => {},
    onCreate: () => {},

    index: 0,
    onCategoryClick: () => {},
    onSetCategory: () => {},
    onCreateCategory: () => {},
    onRemoveCategory: () => {},

    onDelete: () => {},
    onComplete: () => {},

    task: {},
    creating: false
  };

  state = {};

  render() {
    const { creating } = this.props;
    let component = <StaticTaskComponent {...this.props} />;
    if (creating) {
      component = <EditableTaskComponent {...this.props} />;
    }
    return <>{component}</>;
  }
}

TaskComponent.propTypes = {
  // ...StaticProps,
  onUndo: PropTypes.func,
  onCreate: PropTypes.func,
  // ...EditableProps,
  index: PropTypes.number,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onCategoryClick: PropTypes.func,
  onSetCategory: PropTypes.func,
  onCreateCategory: PropTypes.func,
  onRemoveCategory: PropTypes.func,
  // Common
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    todoWithin: PropTypes.instanceOf(Date).isRequired,
    completedAt: PropTypes.instanceOf(Date),
    createdAt: PropTypes.instanceOf(Date).isRequired,
    userId: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape())
  }),
  creating: PropTypes.bool
};

export default TaskComponent;
