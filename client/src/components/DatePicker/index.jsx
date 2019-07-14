import React from "react";
import PropTypes from "prop-types";

import Input from "../Input";
import { toInputDateFormat } from "~/utils/Common";

import { StyledDatePicker } from "./style";

const Small = "small";
const Normal = "normal";
const Large = "large";

const DatePicker = ({ size, value, ...props }) => {
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

DatePicker.propTypes = {
  size: PropTypes.oneOf([Small, Normal, Large]),
  value: PropTypes.node.isRequired
};

DatePicker.defaultProps = {
  size: "normal"
};

export default DatePicker;
