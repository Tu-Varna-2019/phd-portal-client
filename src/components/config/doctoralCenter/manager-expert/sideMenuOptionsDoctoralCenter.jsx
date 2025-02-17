import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const role = "/doctoralCenter";

export const sideMenuOptionsDoctoralCenter = [
  {
    text: "Начална страница",
    icon: <HomeRoundedIcon />,
    url: role
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
