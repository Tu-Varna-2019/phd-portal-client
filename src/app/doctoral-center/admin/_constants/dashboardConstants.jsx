import SchoolIcon from "@mui/icons-material/School";
import Groups2Icon from "@mui/icons-material/Groups2";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";

export const logBarChartSeriesStruct = [
  {
    id: "info",
    label: "Информация",
    data: [],
    stack: "A"
  },
  {
    id: "success",
    label: "Успешност",
    data: [],
    stack: "A"
  },
  {
    id: "warn",
    label: "Предупреждение",
    data: [],
    stack: "A"
  },
  {
    id: "error",
    label: "Грешка",
    data: [],
    stack: "A"
  }
];

export const userGroupsLabelStuct = [
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

export const userGroupsPieChartStruct = [
  { label: "Неоторизирани", value: 0 },
  { label: "Докторант", value: 0 },
  { label: "Преподавател", value: 0 },
  { label: "Ръководител на докторантски център", value: 0 },
  { label: "Експерт на докторантски център", value: 0 },
  { label: "Администратори", value: 0 }
];
