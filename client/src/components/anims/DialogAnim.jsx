import React from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

import { commonSizes } from "../../styles/sizes";

const duration = 250;

const defaultStyle = {
  position: "fixed",
  backgroundColor: "",
  width: "100vw",
  top: 0,
  left: 0,
  padding: `0 ${commonSizes.containerMargin} 0 ${commonSizes.containerMargin}`,
  boxSizing: "border-box",
  transition: `all ${duration}ms ease-in-out`,
  height: "0px",
  opacity: "0",
  visibility: "hidden"
};

const transitionStyles = {
  entering: {
    height: "0px",
    opacity: "0",
    visibility: "hidden"
  },
  entered: {
    display: "block",
    height: "100vh",
    opacity: "1",
    visibility: "visible"
  }
};

const DialogAnim = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);

DialogAnim.propTypes = {
  in: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default DialogAnim;
