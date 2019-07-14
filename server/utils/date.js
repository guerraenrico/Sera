const moment = require("moment");

const currentMonthDates = () => {
  const start = moment().startOf("isoMonth");
  const end = moment().endOf("isoMonth");
  return [start.toDate(), end.toDate()];
};

const currentYearDates = () => {
  const start = moment().startOf("isoYear");
  const end = moment().endOf("isoYear");
  return [start.toDate(), end.toDate()];
};

const currentWeekDates = () => {
  const start = moment().startOf("isoWeek");
  const end = moment().endOf("isoWeek");
  return [start.toDate(), end.toDate()];
};

module.exports = {
  currentMonthDates,
  currentYearDates,
  currentWeekDates
};
