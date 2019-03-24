import styled from "styled-components";
import DatePicker from "react-date-picker";

import { commonColors, datePickerColors } from "../../../styles/colors";
import { commonSizes, inputSizes } from "../../../styles/sizes";
import { fontFamily } from "../../../styles/common";

export const StyledDatePicker = styled(DatePicker)`
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

  & .react-date-picker__button {
    padding: 15px 25px;
    border: none;
  }

  & .react-date-picker__button__input {
    color: ${datePickerColors.input};
  }

  & .react-date-picker__button__input__input {
    font-size: 1.2rem;
    color: ${datePickerColors.input};
  }

  & .react-date-picker__button__input__input::-webkit-input-placeholder {
    color: ${datePickerColors.input};
  }

  & .react-date-picker__button__input__input:-moz-placeholder {
    color: ${datePickerColors.input};
    opacity: 1;
  }

  & .react-date-picker__button__input__input::-moz-placeholder {
    color: ${datePickerColors.input};
    opacity: 1;
  }

  & .react-date-picker__button__input__input: -ms-input-placeholder {
    color: ${datePickerColors.input};
  }

  & .react-date-picker__button__input__input: : -ms-input-placeholder {
    color: ${datePickerColors.input};
  }

  & .react-date-picker__button__input__input: : placeholder {
    color: ${datePickerColors.input};
  }

  & .react-date-picker__button__icon {
    font-size: 1rem;
    color: ${datePickerColors.input};
  }
`;

export default StyledDatePicker;
