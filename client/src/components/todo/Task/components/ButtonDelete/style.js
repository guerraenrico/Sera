import styled from "styled-components";

import { buttonDeleteTaskColors } from "~/styles/colors";

export const Button = styled.button`
  display: inherit;
  background: none;
  height: 28px;
  width: 28px;
  background-color: ${buttonDeleteTaskColors.background};
  outline: none;
  border: none;
  cursor: pointer;
  align-self: center;
  justify-self: end;
  margin-right: 40px;
  padding: 0;
  box-sizing: border-box;
  border-radius: 50%;
  transition: background 200ms ease-in;

  &:hover {
    background-color: ${buttonDeleteTaskColors.backgroundHover};
  }
`;

export const Icon = styled.i`
  margin: auto;
  font-size: 0.9em;
  color: ${buttonDeleteTaskColors.icon};
  transition: color 200ms ease-in;
  padding: 0;

  ${Button}:hover & {
    color: ${buttonDeleteTaskColors.iconHover};
  }
`;
