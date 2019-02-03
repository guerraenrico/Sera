import React from "react";
import PropTypes from "prop-types";
import Fade from "../anims/Fade";

const delay = 1000;

class LoaderLinear extends React.Component {
  state = {
    shouldShow: false,
    startTimer: false,
    clearTimer: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
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

  timeout = null;

  render() {
    const { shouldShow } = this.state;
    return (
      <Fade in={shouldShow}>
        <div className="loader" />
      </Fade>
    );
  }
}

LoaderLinear.propTypes = {
  // eslint-disable-next-line
  show: PropTypes.bool
};

LoaderLinear.defaultProps = {
  show: false
};

export default LoaderLinear;
