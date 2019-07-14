const Task = require("./Task");

const { isNullOrUndefined } = require("../utils/common");
const {
  currentMonthDates,
  currentWeekDates,
  currentYearDates
} = require("../utils/date");
const database = require("../utils/database");

const TimeInterval = {
  MONTH: "month",
  WEEK: "week",
  YEAR: "year",
  ALL: "all"
};

const datesRangeFromInterval = timeInterval => {
  switch (timeInterval) {
    case TimeInterval.WEEK:
      return currentWeekDates();
    case TimeInterval.MONTH:
      return currentMonthDates();
    case TimeInterval.YEAR:
      return currentYearDates();
    default:
      return [];
  }
};

const GetTaskResults = async ({ userId, timeInterval = TimeInterval.all }) => {
  const db = database.instance();
  const [from, to] = datesRangeFromInterval(timeInterval);
  const filter = {
    $and: [
      { [Task.Schema.fields.userId]: userId },
      isNullOrUndefined(from) && isNullOrUndefined(to)
        ? {
            [Task.Schema.fields.todoWithin]: {
              ...(!isNullOrUndefined(from) && { $gte: from }),
              ...(!isNullOrUndefined(to) && { $lt: to })
            }
          }
        : {}
    ]
  };
  const query = db.collection(Task.Schema.name).find(filter);
  const tasksDocs = await query.toArray();
  return {
    completed: tasksDocs.reduce(
      (tot, doc) => (tot + doc[Task.Schema.fields.completed] ? 1 : 0),
      0
    ),
    total: tasksDocs.length
  };
};

module.exports = {
  GetTaskResults
};
