import styled from "styled-components";

import { commonColors } from "../../../styles/colors";
import { commonSizes } from "../../../styles/sizes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${commonColors.backgroundDark}
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  -webkit-border-radius: ${commonSizes.containerBorderRadius};
  border-radius: ${commonSizes.containerBorderRadius};
  overflow: hidden;
  transition: height 500ms ease-in;
`;

export default Container;
