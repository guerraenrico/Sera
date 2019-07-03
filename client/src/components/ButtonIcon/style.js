import styled from "styled-components";

import { buttonIconColors } from "~/styles/colors";
import { buttonIconSizes } from "~//styles/sizes";

export const Button = styled.button`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  margin: ${props => buttonIconSizes[props.size].margin};
`;

export const Icon = styled.i`
  font-size: ${props => buttonIconSizes[props.size].fontSize};
  color: ${buttonIconColors.icon};

  ${Button}:hover & {
    color: ${buttonIconColors.iconHover};
  }
`;
