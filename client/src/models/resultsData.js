import PropTypes from "prop-types";

export const TimeInterval = {
  MONTH: "MONTH",
  WEEK: "WEEK",
  YEAR: "YEAR"
};

export const StatisticType = PropTypes.shape({
  completed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
});

export const ResultsDataType = PropTypes.shape({
  tasks: PropTypes.shape(StatisticType).isRequired,
  goals: PropTypes.shape(StatisticType).isRequired
});
