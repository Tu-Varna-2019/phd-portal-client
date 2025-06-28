import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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
      text: tr("Unauthorized users"),
      icon: <AccountCircleIcon />,
      url: path + "/unauthorized"
    },
    {
      text: tr("Applications"),
      icon: <ArticleIcon />,
      url: path + "/candidates"
    },
    {
      text: tr("Exams"),
      icon: <CalendarTodayIcon />,
      url: path + "/exams"
    }
  ];

  return {
    navigation
  };
};
