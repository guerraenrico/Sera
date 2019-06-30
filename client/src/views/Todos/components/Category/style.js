import styled from "styled-components";

import { categoryChipColors } from "~/styles/colors";
import { categoryChipSizes } from "~/styles/sizes";
import { alignItemCenter } from "~/styles/common";

export const Chip = styled.div`
  padding: ${categoryChipSizes.padding};
  background-color: ${categoryChipColors.background};
  border-radius: 50px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${alignItemCenter}

  &:hover {
    background-color: ${categoryChipColors.backgroundHover};
  }

  &.small {
    padding: ${categoryChipSizes.paddingSmall};
  }
`;

export const Text = styled.span`
  color: ${categoryChipColors.text};
  font-size: ${categoryChipSizes.text};
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 1em 0 1em;

  ${Chip}:hover & {
    color: ${categoryChipColors.textHover};
  }

  ${Chip}.small & {
    font-size: ${categoryChipSizes.textSmall};
  }
`;
