import styled from "styled-components";

import { switchColors } from "~/styles/colors";
import { commonSizes } from "~/styles/sizes";

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
  padding: 1.5rem;
  margin: 2rem;
`;

export const Icon = styled.i`
  color: ${switchColors.optionItem};
  font-size: 2rem;
  transition: all 150ms ease-in-out;

  ${Option}:hover & {
    color: ${switchColors.optionItemHover};
  }

  ${Option}.selected & {
    color: ${switchColors.optionItemSelected};
  }
`;

export const Text = styled.span`
  color: ${switchColors.optionItem};
  font-size: 1rem;
  transition: all 150ms ease-in-out;
  text-align: center;
  margin-top: 1rem;
  font-weight: 700;

  ${Option}:hover & {
    color: ${switchColors.optionItemHover};
  }

  ${Option}.selected & {
    color: ${switchColors.optionItemSelected};
  }
`;
