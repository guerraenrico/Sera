// @flow
import React, { Component } from "react";
import Fade from "../anims/Fade";
import { LoaderLinear } from "./style";

const delay = 1000;

type Props = {
  // eslint-disable-next-line
  +show?: boolean
};

type State = {
  +shouldShow: boolean
};

class LoaderLinearComponent extends Component<Props, State> {
  static defaultProps = {
    show: false
  };

  state = {
    shouldShow: false
  };

  timeout = null;

  componentDidUpdate(prevProps: Props) {
    const { show } = this.props;
    if (prevProps.show !== show) {
      // Show loader
      if (show && !prevProps.show) {
        // Only if timer not set
        if (!this.timeout) {
          this.timeout = setTimeout(() => {
            this.setState({ shouldShow: true });
            clearTimeout(this.timeout);
            this.timeout = null;
          }, delay);
        }
      }
      // Hide loader
      if (!show && prevProps.show) {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.setState({ shouldShow: false });
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { shouldShow } = this.state;
    return (
      <Fade in={shouldShow}>
        <LoaderLinear />
      </Fade>
    );
  }
}

export default LoaderLinearComponent;
