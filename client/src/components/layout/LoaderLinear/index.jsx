// @flow
import React, { Component } from "react";
import Fade from "../../anims/Fade";
import { LoaderLinear } from "./style";

const delay = 1000;

type Props = {
  // eslint-disable-next-line
  show?: boolean
};

type State = {
  shouldShow: boolean,
  startTimer: boolean,
  clearTimer: boolean
};

class LoaderLinearComponent extends Component<Props, State> {
  static defaultProps = {
    show: false
  };

  state = {
    shouldShow: false,
    startTimer: false,
    clearTimer: false
  };

  timeout = null;

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState) {
      if (nextProps.show) {
        return {
          shouldShow: false,
          startTimer: true,
          clearTimer: true
        };
      }
      return {
        shouldShow: false,
        startTimer: false,
        clearTimer: true
      };
    }
    return null;
  }

  componentDidUpdate() {
    const { startTimer, clearTimer } = this.state;
    if (clearTimer) {
      clearTimeout(this.timeout);
    }
    if (startTimer) {
      this.timeout = setTimeout(() => {
        this.setState({ shouldShow: true });
      }, delay);
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
