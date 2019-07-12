import styled, { keyframes } from "styled-components";
import { loaderLinearColors } from "~/styles/colors";

const loading = keyframes`
  from {
    left: -30%;
    width: 30%;
  }
  50% {
    width: 30%;
  }
  70% {
    width: 70%;
  }
  80% {
    left: 50%;
  }
  95% {
    left: 120%;
  }
  to {
    left: 100%;
  }
`;

export const LoaderLinear = styled.div`
  height: 4px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: ${loaderLinearColors.background};
  z-index: 1;

  &:before {
    display: block;
    position: absolute;
    content: "";
    left: -200px;
    width: 200px;
    height: 4px;
    background-color: ${loaderLinearColors.indicatorBackground};
    animation: ${loading} 2s linear infinite;
  }
`;

export default LoaderLinear;
