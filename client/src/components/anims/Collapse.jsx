import React from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  height: 0,
  opacity: 0
};

const onEnter = node => {
  const { style } = node;
  style.height = `${node.firstElementChild.offsetHeight}px`;
  style.opacity = 1;
};

const onExit = node => {
  const { style } = node;
  style.height = "0px";
  style.opacity = 0;
};

const Collapse = ({ in: inProp, children }) => (
  <Transition onEnter={onEnter} onExit={onExit} in={inProp} timeout={duration}>
    {() => (
      <div
        style={{
          ...defaultStyle
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);

Collapse.propTypes = {
  in: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Collapse;
