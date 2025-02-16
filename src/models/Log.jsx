import { getMonth, getYear } from "@/lib/helpers/utils";

export default class Log {
  description;
  timestamp;
  action;
  level;

  constructor(description, action, level) {
    this.description = description;
    this.timestamp = new Date().toISOString();
    this.action = action;
    this.level = level;
  }

  static filterByLevelAndYear(logs, level, year) {
    return logs.filter(
      (log) => log.level == level && getYear(log.timestamp) == year
    );
  }

  static getTwelveMonthsArrNum(logs) {
    const monthsArr = [];

    for (let month = 0; month < 12; month++) {
      const getMonthFromLogs = (monthArg) =>
        logs.filter((log) => getMonth(log.timestamp) == monthArg);

      const log = getMonthFromLogs(month);
      const isMonthPresentInLog = Object.keys(log).length != 0;

      if (isMonthPresentInLog) {
        monthsArr.push(log.length);
      } else {
        monthsArr.push(0);
        continue;
      }
    }

    return monthsArr;
  }

  static getLogYears(logs) {
    const logYears = [];

    logs.map((log) => {
      if (
        logYears.findIndex(
          (logYear) => (logYear == getYear(log.timestamp)) == -1
        )
      )
        logYears.push(getYear(log.timestamp));
    });

    return Array.from(new Set(logYears));
  }
}
