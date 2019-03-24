// @flow
import React from "react";

import Input from "../Input";
import { toInputDateFormat } from "../../../utils/Common";

import { StyledDatePicker } from "./style";

type Small = "small";
type Normal = "normal";
type Large = "large";

type Props = {
  +size?: Small | Normal | Large,
  +value: Date
};

const DatePicker = ({ size, value, ...props }: Props) => {
  // TODO: fallback on native component on mobile
  return (
    // <StyledDatePicker
    //   size={size}
    //   calendarClassName="dark-calendar"
    //   minDate={new Date()}
    //   locale="en-US"
    //   clearIcon={<i className="icon-delete" />}
    //   calendarIcon={<i className="icon-calendar" />}
    //   {...props}
    // />
    <Input
      type="date"
      size={size}
      value={toInputDateFormat(value)}
      {...props}
    />
  );
};

DatePicker.defaultProps = {
  size: "normal"
};

export default DatePicker;
