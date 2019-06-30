import styled from "styled-components";

import { switchColors } from "~/styles/colors";
import { commonSizes } from "~/styles/sizes";

export const Switch = styled.div`
  width: 100px;
  background-color: ${switchColors.optionSelectedBackground};
  display: inline-flex;
  justify-content: space-between;
  flex-direction: row;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 50%;
`;

export const Option = styled.div`
  display: inline-flex;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  border-radius: ${commonSizes.containerBorderRadius};
`;

export const Icon = styled.i`
  color: ${switchColors.optionIcon};
  font-size: 2rem;
  transition: all 150ms ease-in-out;

  ${Option}:hover & {
    color: ${switchColors.optionIconHover};
  }

  ${Option}.selected & {
    color: ${switchColors.optionIconSelected};
  }
`;
