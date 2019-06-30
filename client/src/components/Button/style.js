import styled from "styled-components";

import { buttonColors } from "~/styles/colors";
import { fontFamily } from "~/styles/common";

export const Button = styled.button`
  font-family: ${fontFamily};
  display: inherit;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  align-self: center;
  justify-self: end;
  padding: 0;
  margin: 0 1.5rem;
  box-sizing: border-box;
  border-radius: 50%;
`;

export const Text = styled.span`
  color: ${props => buttonColors[props.color].text};
  font-weight: 700;
  font-size: 1.2em;
  transition: color 200ms ease-in;
  padding-right: 5px;

  ${Button}:hover & {
    color: ${props => buttonColors[props.color].textHover};
  }
`;
