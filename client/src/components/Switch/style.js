import styled from "styled-components";

import { switchColors } from "~/styles/colors";
import { commonSizes, optionSizes } from "~/styles/sizes";

export const Switch = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Option = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  border-radius: ${commonSizes.containerBorderRadius};
  background-color: ${props =>
    props.selected
      ? switchColors.optionSelectedBackground
      : switchColors.background};
  padding: ${optionSizes.padding};
  margin: ${optionSizes.margin};
`;

export const Icon = styled.i`
  color: ${switchColors.optionItem};
  font-size: ${optionSizes.iconFontSize};
  transition: all 150ms ease-in-out;
  margin-bottom: 1rem;

  ${Option}:hover & {
    color: ${switchColors.optionItemHover};
  }

  ${Option}.selected & {
    color: ${switchColors.optionItemSelected};
  }
`;

export const Text = styled.span`
  color: ${switchColors.optionItem};
  font-size: ${optionSizes.textFontSize};
  transition: all 150ms ease-in-out;
  text-align: center;
  font-weight: 700;

  ${Option}:hover & {
    color: ${switchColors.optionItemHover};
  }

  ${Option}.selected & {
    color: ${switchColors.optionItemSelected};
  }
`;
