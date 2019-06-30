import styled from "styled-components";

import { commonColors } from "~/styles/colors";

export const Button = styled.button`
  width: 97px;
  min-width: 97px;
  height: 97px;
  display: inline-block;
  box-sizing: border-box;
  background-color: ${commonColors.backgroundNight};
  outline: none;
  border: none;
  cursor: pointer;
`;

export const Icon = styled.i`
  font-size: 2.5em;
  color: ${commonColors.iconButton};

  ${Button}:hover & {
    color: ${commonColors.iconButtonHover};
  }
`;
