// @flow
import React from "react";
import EditableTaskComponent from "./editable";
import StaticTaskComponent from "./static";

import type { StaticProps } from "./static";
import type { EditableProps } from "./editable";

type Props = {
  ...StaticProps,
  ...EditableProps,
  +creating?: boolean
};
type State = {};

class TaskComponent extends React.PureComponent<Props, State> {
  static defaultProps = {
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
