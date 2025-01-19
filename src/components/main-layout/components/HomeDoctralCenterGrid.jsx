import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StatCard from "./StatCard";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PieChartDiagram from "./PieChartDiagram";
import SchoolIcon from "@mui/icons-material/School";
import Groups2Icon from "@mui/icons-material/Groups2";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import DoctoralCenterAPI from "@/lib/api/doctralCenter";
import BarChartDashboard from "./BarChartDashboard";

const data = [];

const dashboardStruct = {
  title: "",
  value: 0,
  interval: "",
  trend: "neutral",
  data: []
};

const userGroupsVariantLabels = [
  {
    name: "Неоторизирани",
    value: 0,
    icon: <NoAccountsIcon />,
    color: "hsl(220, 25%, 65%)"
  },
  {
    name: "Докторант",
    value: 0,
    icon: <SchoolIcon />,
    color: "hsl(220, 25%, 65%)"
  },
  {
    name: "Преподавател",
    value: 0,
    icon: <Groups2Icon />,
    color: "hsl(220, 25%, 45%)"
  },
  {
    name: "Ръководители на докторантски център",
    value: 0,
    icon: <LocationCityIcon />,
    color: "hsl(220, 25%, 30%)"
  },
  {
    name: "Експерт на докторантски център",
    value: 0,
    icon: <LocationCityIcon />,
    color: "hsl(220, 25%, 30%)"
  },
  {
    name: "Администратори",
    value: 0,
    icon: <AdminPanelSettingsIcon />,
    color: "hsl(220, 25%, 20%)"
  }
];

const userGroupsPieChartData = [
  { label: "Неоторизирани", value: 0 },
  { label: "Докторант", value: 0 },
  { label: "Преподавател", value: 0 },
  { label: "Ръководител на докторантски център", value: 0 },
  { label: "Експерт на докторантски център", value: 0 },
  { label: "Администратори", value: 0 }
];

export default function HomeDoctoralCenterGrid() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const [userGroupsData, setUserGroupsData] = useState(userGroupsVariantLabels);
  const [userGroupsChartData, setUserGroupsChartData] = useState(
    userGroupsPieChartData
  );
  const [users, setUsers] = useState([]);
  const { fetchAutorizedUsers, fetchUnauthorizedUsers } = DoctoralCenterAPI();

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
          userGroupsVariantLabels,
          authUsers,
          unauthorizedUsers
        )
      );

      setUserGroupsChartData(
        assignUserGroupsDataValue(
          userGroupsPieChartData,
          authUsers,
          unauthorizedUsers
        )
      );
    };

    getUsers();
  }, [setUsers]);

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
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <PieChartDiagram
              title={""}
              chartAvgValue={getSumUsers().toString()}
              pieChartLabels={userGroupsData}
              data={userGroupsChartData}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <BarChartDashboard title={"Lo"} description={"Lo"} avgValue={"Lo"} />
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>{/*Data grid is here*/}</Grid>
      </Grid>
    </Box>
  );
}
