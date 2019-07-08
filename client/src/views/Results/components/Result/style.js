import styled from "styled-components";

import { commonColors } from "~/styles/colors";
import { taskSizes, commonSizes, resultItemSize } from "~/styles/sizes";

export const Content = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${commonColors.background};
  box-sizing: border-box;
  border-radius: ${commonSizes.containerBorderRadius};
  transition: height 500ms ease-in;
  margin-right: ${props => (props.first ? commonSizes.containerMargin : 0)};
  padding: ${resultItemSize.padding};
`;

export const Title = styled.p`
  font-size: ${taskSizes.titleFontSize};
  color: ${commonColors.textSecondary};
  font-weight: 700;
  padding: 0;
  text-align: center;
  text-transform: uppercase;
  padding: ${resultItemSize.padding};
  margin-bottom: ${resultItemSize.innerMargin};
`;

export const ContentChart = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
