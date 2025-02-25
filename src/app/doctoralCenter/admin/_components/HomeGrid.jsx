import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import { getMonth, runPeriodically } from "@/helpers/utils";
import {
  logBarChartSeriesStruct,
  userGroupsLabelStuct,
  userGroupsPieChartStruct
} from "../_constants/dashboardConstants";
import PieChartDiagram from "@/common/PieChartDiagram";
import BarChartDashboard from "@/common/BarChartDashboard";
import { Pagination } from "@mui/material";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import Log from "@/models/Log";

export default function HomeGrid() {
  const doctoralCenter = useSelector(selectDoctoralCenter);

  const [logs, setLogs] = useState([]);
  const [authUsers, setAuthUsers] = useState([]);
  const [unauthUsers, setUnauthUsers] = useState([]);

  const [selectedYearLog, setSelectedYearLog] = useState();
  const [selectedLogPaginationIndex, setLogPaginationIndex] = useState(1);
  const [logsByYear, setLogsByYear] = useState(logBarChartSeriesStruct);

  const { getAuthorizedUsers, getUnauthorizedUsers, getLogs } =
    DoctoralCenterAdminAPI();

  const fetchUsers = useCallback(async () => {
    setAuthUsers(await getAuthorizedUsers());
    setUnauthUsers(await getUnauthorizedUsers());
  }, []);

  const fetchLogs = useCallback(async () => {
    const fetchedLogs = await getLogs();
    setLogs(fetchedLogs);
  }, []);

  useEffect(() => {
    fetchLogs();
    fetchUsers();
    const interval = runPeriodically(() => {
      fetchLogs();
      fetchUsers();
    });
    return interval;
  }, [fetchUsers, fetchLogs]);

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

  const LogYears = useMemo(() => {
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
    setSelectedYearLog(LogYears[value - 1]);
    setLogsByYear(getLogsByYear(LogYears[value - 1]));
  };

  const assignUserGroupsDataValue = (
    pieChartDataStruct,
    authUsers,
    unauthUsers
  ) => {
    const users = ["phd", "committee", "manager", "expert", "admin"];
    const userCounts = [unauthUsers.length];

    users.forEach((userGroup) => {
      const userCount = authUsers.filter(
        (user) => user.role == userGroup
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

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Добре дошли {doctoralCenter.name}
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <PieChartDiagram
              title={"Потребители в системата"}
              chartAvgValue={getSumUsers()}
              pieChartLabels={userGroupsData}
              data={userGroupsChartData}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <BarChartDashboard
            title={`Събития за година ${selectedYearLog}`}
            description={"Времева линия на събитията"}
            avgValue={sumOfLogsByYear}
            logsBarChartSeries={logsByYear}
          />
          <Pagination
            page={selectedLogPaginationIndex}
            color="primary"
            count={LogYears.length}
            onChange={logYearChangeOnClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
