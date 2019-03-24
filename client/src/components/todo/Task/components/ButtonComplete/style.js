import styled from "styled-components";

import { buttonCompleteTaskColors } from "../../../../../styles/colors";

export const Button = styled.button`
  display: inherit;
  height: 35px;
  width: 35px;
  background: none;
  background-color: ${buttonCompleteTaskColors.background};
  outline: none;
  border: none;
  cursor: pointer;
  align-self: center;
  justify-self: end;
  box-sizing: border-box;
  border-radius: 50%;
  transition: background 200ms ease-in;

  &:hover {
    background-color: ${buttonCompleteTaskColors.backgroundHover};
  }

  &.completed {
    background-color: ${buttonCompleteTaskColors.backgroundCompleted};
  }
`;

export const Icon = styled.i`
  margin: auto;
  font-size: 1.2em;
  color: ${buttonCompleteTaskColors.icon};
  transition: color 200ms ease-in;

  ${Button}:hover & {
    color: ${buttonCompleteTaskColors.iconHover};
  }

  ${Button}.completed:hover & {
    color: ${buttonCompleteTaskColors.iconCompleted};
  }
`;
