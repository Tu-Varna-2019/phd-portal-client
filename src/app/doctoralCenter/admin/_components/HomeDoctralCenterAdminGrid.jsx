import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StatCard from "@/common/StatCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import { CURRENT_YEAR, getMonth } from "@/helpers/utils";
import {
  logBarChartSeriesStruct,
  userGroupsLabelStuct,
  userGroupsPieChartStruct
} from "@/config/doctoralCenter/admin/dashboard";
import PieChartDiagram from "@/common/PieChartDiagram";
import BarChartDashboard from "@/common/BarChartDashboard";
import { Pagination } from "@mui/material";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import Log from "@/models/Log";

const statCardStruct = [
  {
    title: "Събития",
    value: 0,
    interval: "Последните 30 дни",
    trend: "neutral",
    data: []
  }
];

export default function DoctoralCenterAdminHomeGrid() {
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
    DoctoralCenterAdminAPI();

  useEffect(() => {
    const getUsers = async () => {
      const authUsers = await fetchAutorizedUsers();
      const unauthorizedUsers = await fetchUnauthorizedUsers();

      setUsers([].concat(authUsers).concat(unauthorizedUsers));

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

      const years = Log.getLogYears(logs);
      setLogsByYear(years);
      setLogsPagination(years.findIndex((year) => year == CURRENT_YEAR) + 1);
    }
  }, [logs]);

  const setStatCardDataset = () => {
    const statCardResult = statCardStruct;

    statCardResult[0].value = logsByYear.length;
    setStatCardData(statCardResult);
  };

  const aggregateLogsByYearMonths = (logLevel, year) => {
    const levelSpecificLogs = Log.filterByLevelAndYear(logs, logLevel, year);

    levelSpecificLogs.sort(
      (logA, logB) => getMonth(logA.timestamp) > getMonth(logB.timestamp)
    );

    return Log.getTwelveMonthsArrNum(levelSpecificLogs);
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
    const users = ["phd", "committee", "manager", "expert", "admin"];
    const userCounts = [unauthorizedCount];

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
