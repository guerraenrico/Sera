import styled from "styled-components";

import { fontFamily } from "~/styles/common";
import { commonColors } from "~/styles/colors";
import { inputSizes } from "~/styles/sizes";

export const Input = styled.input`
  font-family: ${fontFamily};
  color: ${commonColors.textPrimary};
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  font-size: ${props => inputSizes[props.size].fontSize};
  padding: ${props => inputSizes[props.size].padding};
  font-weight: 300;

  &::placeholder {
    color: ${commonColors.inputPlaceholder};
  }

  &:-ms-input-placeholder {
    color: ${commonColors.inputPlaceholder};
  }

  &::-ms-input-placeholder {
    color: ${commonColors.inputPlaceholder};
  }
`;

export default Input;
