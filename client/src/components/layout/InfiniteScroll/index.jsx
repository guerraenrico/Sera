import React from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";

const waitTime = 500;

class InfiniteScroll extends React.Component {
  onScrollThrottle = undefined;

  componentDidMount() {
    this.onScrollThrottle = throttle(this.onScroll, waitTime);
    window.addEventListener("scroll", this.onScrollThrottle, false);
  }

  componentWillUnmount() {
    if (this.onScrollThrottle !== undefined) {
      window.removeEventListener("scroll", this.onScrollThrottle, false);
    }
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      const { args, onScroll } = this.props;
      onScroll(...args);
    }
  };

  render() {
    const { children, className } = this.props;
    return <div className={className}>{children}</div>;
  }
}

InfiniteScroll.propTypes = {
  args: PropTypes.arrayOf(PropTypes.any),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onScroll: PropTypes.func.isRequired
};

InfiniteScroll.defaultProps = {
  args: [],
  className: ""
};

export default InfiniteScroll;
