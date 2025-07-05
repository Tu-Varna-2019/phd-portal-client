import Log from "@/models/Log";
import { useCallback, useEffect, useMemo, useState } from "react";
import DoctoralCenterAdminAPI from "@/api/DoctoralCenterAdminAPI";
import { getMonth, runPeriodically } from "@/helpers/utils";
import HomeConstants from "../_constants/dashboardConstants";
import Translate from "@/lib/helpers/Translate";

export function LogsHook() {
  const { getLogs } = DoctoralCenterAdminAPI();
  const { logBarChartSeriesStruct } = HomeConstants();
  const { language } = Translate();

  const [logs, setLogs] = useState([]);
  const [selectedYearLog, setSelectedYearLog] = useState();
  const [selectedLogPaginationIndex, setLogPaginationIndex] = useState(1);
  const [logsByYear, setLogsByYear] = useState(logBarChartSeriesStruct);

  const fetchLogs = useCallback(async () => {
    const fetchedLogs = await getLogs();
    setLogs(fetchedLogs);
  }, [language]);

  useEffect(() => {
    fetchLogs();
    return runPeriodically(() => {
      fetchLogs();
    });
  }, [fetchLogs]);

  const aggregateLogsByYearMonths = (logLevel, year) => {
    const levelSpecificLogs = Log.filterByLevelAndYear(logs, logLevel, year);

    levelSpecificLogs.sort(
      (logA, logB) => getMonth(logA.timestamp) > getMonth(logB.timestamp)
    );

    return Log.getTwelveMonthsArrNum(levelSpecificLogs);
  };

  const getLogsByYear = (year) => {
    const barChartStuct = logBarChartSeriesStruct;
    barChartStuct.forEach((_, index) => {
      barChartStuct[index].data = aggregateLogsByYearMonths(
        barChartStuct[index].id,
        year
      );
    });
    return barChartStuct;
  };

  const sumOfLogsByYear = useMemo(() => {
    let totalLogs = 0;
    logBarChartSeriesStruct.forEach((_, index) => {
      logBarChartSeriesStruct[index].data = aggregateLogsByYearMonths(
        logBarChartSeriesStruct[index].id,
        selectedYearLog
      );
      totalLogs += logBarChartSeriesStruct[index].data.reduce(
        (prev, currentValue) => (prev = prev + currentValue)
      );
    });

    return totalLogs;
  }, [selectedYearLog, logsByYear]);

  const logYears = useMemo(() => {
    const years = Log.getLogYears(logs);
    return years || [];
  }, [logs]);

  useEffect(() => {
    const years = Log.getLogYears(logs);
    const latestYear = Array.from(years).pop();

    setSelectedYearLog(latestYear);
    setLogsByYear(getLogsByYear(latestYear));
    setLogPaginationIndex(years.length);
  }, [logs]);

  const logYearChangeOnClick = (_, value) => {
    setLogPaginationIndex(value);
    setSelectedYearLog(logYears[value - 1]);
    setLogsByYear(getLogsByYear(logYears[value - 1]));
  };

  return {
    selectedYearLog,
    sumOfLogsByYear,
    logsByYear,
    selectedLogPaginationIndex,
    logYearChangeOnClick,
    logYears
  };
}

export function UserHook() {
  const [authUsers, setAuthUsers] = useState([]);
  const [unauthUsers, setUnauthUsers] = useState([]);
  const users = ["phd", "committee", "manager", "expert", "admin"];
  const { getAuthorizedUsers, getUnauthorizedUsers } = DoctoralCenterAdminAPI();
  const { userGroupsPieChartStruct, userGroupsLabelStuct } = HomeConstants();
  const { language } = Translate();

  const fetchUsers = useCallback(async () => {
    setAuthUsers(await getAuthorizedUsers());
    setUnauthUsers(await getUnauthorizedUsers());
  }, [language]);

  useEffect(() => {
    fetchUsers();
    return runPeriodically(() => {
      fetchUsers();
    });
  }, [fetchUsers]);

  const assignUserGroupsDataValue = (
    pieChartDataStruct,
    authUsers,
    unauthUsers
  ) => {
    const userCounts = [unauthUsers.length];

    users.forEach((userGroup) => {
      const userCount = authUsers.filter(
        (user) => user.group == userGroup
      ).length;
      userCounts.push(userCount);
    });

    for (let ii = 0; ii < pieChartDataStruct.length; ii++)
      pieChartDataStruct[ii].value = userCounts[ii];

    return pieChartDataStruct;
  };

  const userGroupsData = useMemo(() => {
    return assignUserGroupsDataValue(
      userGroupsLabelStuct,
      authUsers,
      unauthUsers
    );
  }, [authUsers, unauthUsers]);

  const userGroupsChartData = useMemo(() => {
    return assignUserGroupsDataValue(
      userGroupsPieChartStruct,
      authUsers,
      unauthUsers
    );
  }, [authUsers, unauthUsers]);

  const getSumUsers = useCallback(() => {
    const sum = userGroupsChartData.reduce(
      (total, item) => (total = total + item.value),
      0
    );
    return sum.toString();
  }, [userGroupsChartData]);

  return {
    getSumUsers,
    userGroupsData,
    userGroupsChartData
  };
}
