import styled from "styled-components";

import { categoryChipColors } from "../../../styles/colors";
import { categoryChipSize } from "../../../styles/sizes";
import { alignItemCenter } from "../../../styles/common";

export const Chip = styled.div`
  padding: ${categoryChipSize.paddingSmall};
  margin: 0 1.25em;
  background-color: ${categoryChipColors.background};
  border-radius: 50px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${alignItemCenter}

  &:hover {
    border: ${categoryChipColors.backgroundHover};
  }
`;

export const Text = styled.span`
  color: ${categoryChipColors.text};
  font-size: ${categoryChipSize.textSmall};
  font-weight: 500;
  text-transform: uppercase;
  margin: 0 1em 0 1em;

  ${Chip}:hover & {
    color: ${categoryChipColors.textHover};
  }
`;
