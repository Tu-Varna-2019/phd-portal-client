import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { path } from "./pathConstant";

export const sideMenu = [
  {
    text: "Начална страница",
    icon: <HomeRoundedIcon />,
    url: path
  },
  {
    text: "Неудостоверени потребители",
    icon: <AccountCircleIcon />,
    url: path + "/unauthorized-users"
  },
  {
    text: "Кандидатури",
    icon: <ArticleIcon />,
    url: path + "/candidates"
  },
  {
    text: "Изпити",
    icon: <CalendarTodayIcon />,
    url: path + "/exams"
  }
];
