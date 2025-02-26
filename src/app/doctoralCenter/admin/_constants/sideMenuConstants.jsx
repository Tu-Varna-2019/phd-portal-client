import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { path } from "./pathConstant";

export const sideMenu = [
  {
    text: "Начална страница",
    icon: <HomeRoundedIcon />,
    url: path
  },
  {
    text: "Управление на събития",
    icon: <ReceiptLongIcon />,
    url: path + "/event-management"
  },
  {
    text: "Управление на  потребители",
    icon: <AccountCircleIcon />,
    url: path + "/user-management"
  },
  {
    text: "Неоторизирани потребители",
    icon: <NoAccountsIcon />,
    url: path + "/unauthorized-users-management"
  }
];
