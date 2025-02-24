import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import { CURRENT_YEAR, getMonth } from "@/helpers/utils";
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
  const [logsPaginaiton, setLogsPagination] = useState(1);

  const { fetchAutorizedUsers, fetchUnauthorizedUsers, getLogs } =
    DoctoralCenterAdminAPI();

  useEffect(() => {
    let interval;
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
    interval = setInterval(() => {
      getServerLogs();
      getUsers();
    }, process.env.NEXT_PUBLIC_FETCH_API_DURATION);
  }, [setUsers]);

  useEffect(() => {
    if (logs != []) {
      setLogsChartData(assignLogsDataValue(CURRENT_YEAR));
      setSelectedYear(CURRENT_YEAR);
      const years = Log.getLogYears(logs);
      setLogsByYear(years);
      setLogsPagination(years.findIndex((year) => year == CURRENT_YEAR) + 1);
    }
  }, [logs]);

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
    </Box>
  );
}
