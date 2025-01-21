import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StatCard from "@/components/main-layout/common/StatCard";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DoctoralCenterAPI from "@/lib/api/doctralCenter";
import { getMonth, getYear } from "@/lib/utils";
import {
  logBarChartSeriesStruct,
  userGroupsLabelStuct,
  userGroupsPieChartStruct
} from "@/components/config/doctoralCenter/admin/dashboard";
import PieChartDiagram from "@/components/main-layout/common/PieChartDiagram";
import BarChartDashboard from "@/components/main-layout/common/BarChartDashboard";
import { Pagination } from "@mui/material";

const statCardStruct = [
  {
    title: "Събития",
    value: 0,
    interval: "Последните 30 дни",
    trend: "neutral",
    data: []
  }
];

const CURRENT_YEAR = getYear(new Date(Date.now()));

export default function HomeDoctoralCenterGrid() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const [userGroupsData, setUserGroupsData] = useState(userGroupsLabelStuct);
  const [userGroupsChartData, setUserGroupsChartData] = useState(
    userGroupsPieChartStruct
  );
  const [logsChartData, setLogsChartData] = useState(logBarChartSeriesStruct);
  const [logsByYear, setLogsByYear] = useState([]);
  const [selectedLogYear, setSelectedYear] = useState();
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]); // NOTE: Needed for the dashboard users to be rendered
  const [logsTotalSize, setLogsTotalSize] = useState(0);
  const [statCardData, setStatCardData] = useState(statCardStruct);
  const [logsPaginaiton, setLogsPagination] = useState(1);

  const { fetchAutorizedUsers, fetchUnauthorizedUsers, getLogs } =
    DoctoralCenterAPI();

  useEffect(() => {
    const getUsers = async () => {
      const authUsers = await fetchAutorizedUsers();
      const unauthorizedUsers = await fetchUnauthorizedUsers();
      const usersArr = [];

      if (authUsers != null) usersArr.concat(authUsers);
      if (unauthorizedUsers != null) usersArr.concat(unauthorizedUsers);
      setUsers(usersArr);

      setUserGroupsData(
        assignUserGroupsDataValue(
          userGroupsLabelStuct,
          authUsers,
          unauthorizedUsers
        )
      );

      setUserGroupsChartData(
        assignUserGroupsDataValue(
          userGroupsPieChartStruct,
          authUsers,
          unauthorizedUsers
        )
      );
    };

    const getServerLogs = async () => {
      const fetchedLogs = await getLogs();
      setLogs(fetchedLogs);
    };

    getServerLogs();
    getUsers();
  }, [setLogs]);

  useEffect(() => {
    if (logs != []) {
      setLogsChartData(assignLogsDataValue(CURRENT_YEAR));
      setSelectedYear(CURRENT_YEAR);
      setStatCardDataset();

      const years = getAllLogYears();
      setLogsByYear(years);
      setLogsPagination(years.findIndex((year) => year == CURRENT_YEAR) + 1);
    }
  }, [logs]);

  const setStatCardDataset = () => {
    const statCardResult = statCardStruct;
    const currentTime = new Date(Date.now());

    const logsLastThirtyDays = logs.filter(
      (log) => getMonth(log.timestamp) == getMonth(currentTime)
    );

    statCardResult[0].value = logsLastThirtyDays.length;
    setStatCardData(statCardResult);
  };

  const aggregateLogsByYearMonths = (logLevel, year) => {
    const levelSpecificLogs = logs.filter(
      (log) => log.level == logLevel && getYear(log.timestamp) == year
    );
    levelSpecificLogs.sort(
      (logA, logB) => getMonth(logA.timestamp) > getMonth(logB.timestamp)
    );
    const monthCounters = [];

    for (let month = 0; month < 12; month++) {
      const getMonthFromLogs = (monthArg) =>
        levelSpecificLogs.filter((log) => getMonth(log.timestamp) == monthArg);

      const log = getMonthFromLogs(month);
      if (Object.keys(log).length == 0) {
        monthCounters.push(0);
        continue;
      } else monthCounters.push(log.length);
    }

    return monthCounters;
  };

  const getAllLogYears = () => {
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
  };

  const assignLogsDataValue = (year) => {
    const barChartStuct = logBarChartSeriesStruct;

    let totalLogs = 0;
    barChartStuct.forEach((_, index) => {
      barChartStuct[index].data = aggregateLogsByYearMonths(
        barChartStuct[index].id,
        year
      );
      totalLogs += barChartStuct[index].data.reduce(
        (prev, currentValue) => (prev = prev + currentValue)
      );
    });

    setLogsTotalSize(totalLogs);

    return barChartStuct;
  };

  const logYearChangeOnClick = (_, value) => {
    setLogsPagination(value);
    assignLogsDataValue(logsByYear[value - 1]);
    setSelectedYear(logsByYear[value - 1]);
  };

  const assignUserGroupsDataValue = (
    pieChartDataStruct,
    authUsers,
    unauthUsers
  ) => {
    const unauthorizedCount = unauthUsers.length;
    const phdCount = authUsers.filter((user) => user.role == "phd").length;
    const committeeCount = authUsers.filter(
      (user) => user.role == "committee"
    ).length;
    const managerCount = authUsers.filter(
      (user) => user.role == "manager"
    ).length;
    const expertCount = authUsers.filter(
      (user) => user.role == "expert"
    ).length;
    const adminCount = authUsers.filter((user) => user.role == "admin").length;

    const userCounts = [
      unauthorizedCount,
      phdCount,
      committeeCount,
      managerCount,
      expertCount,
      adminCount
    ];

    for (let ii = 0; ii < pieChartDataStruct.length; ii++)
      pieChartDataStruct[ii].value = userCounts[ii];

    return pieChartDataStruct;
  };

  const getSumUsers = () => {
    const sum = userGroupsChartData.reduce(
      (total, item) => (total = total + item.value),
      0
    );
    return sum;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Добре дошли {doctoralCenter.name}
      </Typography>

      {Array.isArray(statCardData) ? (
        statCardData.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))
      ) : (
        <></>
      )}
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
              chartAvgValue={getSumUsers().toString()}
              pieChartLabels={userGroupsData}
              data={userGroupsChartData}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <BarChartDashboard
            title={`Събития за година ${selectedLogYear}`}
            description={"Времева линия на събитията"}
            avgValue={logsTotalSize}
            logsBarChartSeries={logsChartData}
          />
          <Pagination
            page={logsPaginaiton}
            color="primary"
            count={logsByYear.length}
            onChange={logYearChangeOnClick}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>{/*Data grid is here*/}</Grid>
      </Grid>
    </Box>
  );
}
