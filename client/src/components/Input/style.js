import styled from "styled-components";

import { fontFamily } from "~/styles/common";
import { commonColors } from "~/styles/colors";
import { inputSizes } from "~/styles/sizes";

export const Input = styled.input`
  width: 100%;
  font-family: ${fontFamily};
  font-size: ${props => inputSizes[props.size].fontSize};
  font-weight: 300;
  color: ${commonColors.textPrimary};
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  padding: ${props => inputSizes[props.size].padding};

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
