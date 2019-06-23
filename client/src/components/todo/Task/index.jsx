// @flow
import React from "react";
import EditableTaskComponent from "./editable";
import StaticTaskComponent from "./static";

import type { Task } from "../../../models/task";
import type { Category } from "../../../models/category";

type Props = {
  // ...StaticProps,
  +onUndo?: () => void,
  +onCreate?: ({}) => void,
  // ...EditableProps,
  +index?: number,
  +onDelete?: () => void,
  +onComplete?: () => void,
  +onCategoryClick?: Category => void,
  +onSetCategory?: Category => void,
  +onCreateCategory?: string => void,
  +onRemoveCategory?: Category => void,
  // Common
  +task?: Task,
  +creating?: boolean
};

type State = {};

class TaskComponent extends React.PureComponent<Props, State> {
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

export default TaskComponent;
