const moment = require("moment");

const currentMonthDates = () => {
  const start = moment().startOf("month");
  const end = moment().endOf("month");
  return [start.toDate(), end.toDate()];
};

const currentYearDates = () => {
  const start = moment().startOf("year");
  const end = moment().endOf("year");
  return [start.toDate(), end.toDate()];
};

const currentWeekDates = () => {
  const start = moment().startOf("isoWeek");
  const end = moment().endOf("isoWeek");
  return [start.toDate(), end.toDate()];
};

const toISOString = date => moment(date).toISOString();

module.exports = {
  currentMonthDates,
  currentYearDates,
  currentWeekDates,
  toISOString
};
