import styled from "styled-components";

import { buttonDeleteCategoryChipColors } from "../../../../../styles/colors";

export const Button = styled.button`
  background: none;
  outline: none;
  border: none;
  height: 17px;
  cursor: pointer;
`;

export const Icon = styled.i`
  font-size: 0.7rem;
  color: ${buttonDeleteCategoryChipColors.icon};

  ${Button}:hover & {
    color: ${buttonDeleteCategoryChipColors.iconHover};
  }
`;
