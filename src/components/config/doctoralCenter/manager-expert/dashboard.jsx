import SchoolIcon from "@mui/icons-material/School";
import Groups2Icon from "@mui/icons-material/Groups2";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";

export const dashboardStruct = {
  title: "",
  value: 0,
  interval: "",
  trend: "neutral",
  data: []
};

export const candidatesLabelStuct = [
  {
    name: "Чакащи",
    value: 0,
    icon: <NoAccountsIcon />,
    color: "hsl(220, 25%, 65%)"
  },
  {
    name: "Приети",
    value: 0,
    icon: <SchoolIcon />,
    color: "hsl(220, 25%, 65%)"
  },
  {
    name: "Отказани",
    value: 0,
    icon: <Groups2Icon />,
    color: "hsl(220, 25%, 45%)"
  }
];

export const candidatesPieChartStruct = [
  { label: "Чакащи", value: 0 },
  { label: "Приети", value: 0 },
  { label: "Отказани", value: 0 }
];
