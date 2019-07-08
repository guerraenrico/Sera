import styled from "styled-components";

import { commonColors } from "~/styles/colors";

export const defaultChartColor = commonColors.accent;

export const ContentChart = styled.div`
  position: relative;
  display: inline-block;
  transition: all 0.3s ease-in;
`;

export const ChartTotal = styled.circle`
  opacity: 0.1;
`;

export const ChartProgress = styled.circle`
  transform: rotate(-90deg);
  transform-origin: center;
  transition: all 0.6s cubic-bezier(0.58, 0.16, 0.5, 1.14);
  transition-delay: 0.3s;

  ${ContentChart}.no-progress & {
    opacity: 0;
  }
`;
