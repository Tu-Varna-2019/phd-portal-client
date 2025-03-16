import SchoolIcon from "@mui/icons-material/School";
import Groups2Icon from "@mui/icons-material/Groups2";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import Translate from "@/lib/helpers/Translate";

export default function HomeConstants() {
  const { tr } = Translate();

  const logBarChartSeriesStruct = [
    {
      id: "info",
      label: tr("info"),
      data: [],
      stack: "A"
    },
    {
      id: "success",
      label: tr("success"),
      data: [],
      stack: "A"
    },
    {
      id: "warn",
      label: tr("warn"),
      data: [],
      stack: "A"
    },
    {
      id: "error",
      label: tr("error"),
      data: [],
      stack: "A"
    }
  ];

  const userGroupsLabelStuct = [
    {
      name: tr("unauthorized"),
      value: 0,
      icon: <NoAccountsIcon />,
      color: "hsl(220, 25%, 65%)"
    },
    {
      name: tr("phd"),
      value: 0,
      icon: <SchoolIcon />,
      color: "hsl(220, 25%, 65%)"
    },
    {
      name: tr("teacher"),
      value: 0,
      icon: <Groups2Icon />,
      color: "hsl(220, 25%, 45%)"
    },
    {
      name: tr("manager of doctoral center"),
      value: 0,
      icon: <LocationCityIcon />,
      color: "hsl(220, 25%, 30%)"
    },
    {
      name: tr("expert of doctoral center"),
      value: 0,
      icon: <LocationCityIcon />,
      color: "hsl(220, 25%, 30%)"
    },
    {
      name: tr("admins"),
      value: 0,
      icon: <AdminPanelSettingsIcon />,
      color: "hsl(220, 25%, 20%)"
    }
  ];

  const userGroupsPieChartStruct = [
    { label: tr("unauthorized"), value: 0 },
    { label: tr("phd"), value: 0 },
    { label: tr("teacher"), value: 0 },
    { label: tr("manager of doctoral center"), value: 0 },
    { label: tr("expert of doctoral center"), value: 0 },
    { label: tr("admins"), value: 0 }
  ];

  return {
    userGroupsPieChartStruct,
    userGroupsLabelStuct,
    logBarChartSeriesStruct
  };
}
