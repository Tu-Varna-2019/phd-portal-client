import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { path } from "./pathConstant";
import Translate from "@/lib/helpers/Translate";

export const SideMenuConstants = () => {
  const { tr } = Translate();

  const navigation = [
    {
      text: tr("Home page"),
      icon: <HomeRoundedIcon />,
      url: path
    },
    {
      text: tr("Event Management"),
      icon: <ReceiptLongIcon />,
      url: path + "/event-management"
    },
    {
      text: tr("User management"),
      icon: <AccountCircleIcon />,
      url: path + "/user-management"
    },
    {
      text: tr("Unauthorized users"),
      icon: <NoAccountsIcon />,
      url: path + "/unauthorized-users-management"
    }
  ];

  return {
    navigation
  };
};
