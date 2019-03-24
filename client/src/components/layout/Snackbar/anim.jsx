// @flow

import React from "react";
import type { Node } from "react";
import { Transition } from "react-transition-group";

import { SnackbarContainer } from "./style";

const duration = 250;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  bottom: "-100px"
};

const transitionStyles = {
  entering: {
    bottom: "-100px",
    visibility: "hidden"
  },
  entered: {
    bottom: "0px",
    visibility: "visible"
  }
};

type Props = {
  +in: boolean,
  +children: Node,
  +customClass?: string
};

const SnackbarAnim = ({ in: inProp, children, customClass }: Props) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <SnackbarContainer
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
        className={customClass}
      >
        {children}
      </SnackbarContainer>
    )}
  </Transition>
);

SnackbarAnim.defaultProps = {
  customClass: ""
};

export default SnackbarAnim;
