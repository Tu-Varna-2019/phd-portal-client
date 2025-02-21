import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const role = "/doctoralCenter";

export const sideMenuOptionsDoctoralCenter = [
  {
    text: "Начална страница",
    icon: <HomeRoundedIcon />,
    url: role
  },
  {
    text: "Неудостоверени потребители",
    icon: <AccountCircleIcon />,
    url: role + "/unauthorized-users"
  },
  {
    text: "Кандидатури",
    icon: <ArticleIcon />,
    url: role + "/candidates"
  },
  {
    text: "Изпити",
    icon: <CalendarTodayIcon />,
    url: role + "/exams"
  }
];
