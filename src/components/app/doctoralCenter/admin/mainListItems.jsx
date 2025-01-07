import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const role = "/doctoralCenter/admin";

export const mainListItems = [
  {
    text: "Начална страница",
    icon: <HomeRoundedIcon />,
    url: role
  },
  {
    text: "Управление на събития",
    icon: <ReceiptLongIcon />,
    url: role + "/event-management"
  },
  {
    text: "Управление на  потребители",
    icon: <AccountCircleIcon />,
    url: role + "/user-management"
  },
  {
    text: "Неоторизирани потребители",
    icon: <NoAccountsIcon />,
    url: role + "/unauthorized-users-management"
  }
];
