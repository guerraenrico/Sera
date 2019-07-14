import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Fade from "../anims/Fade";
import { LoaderLinear } from "./style";

const delay = 1000;

class LoaderLinearComponent extends PureComponent {
  static defaultProps = {
    show: false
  };

  state = {
    shouldShow: false
  };

  timeout = null;

  componentDidUpdate(prevProps) {
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

LoaderLinearComponent.propTypes = {
  show: PropTypes.bool
};

export default LoaderLinearComponent;
