import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SummarizeIcon from "@mui/icons-material/Summarize";
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
      text: tr("Exams"),
      icon: <CalendarTodayIcon />,
      url: path + "/exams"
    },
    {
      text: tr("Reports"),
      icon: <SummarizeIcon />,
      url: path + "/reports"
    }
    // {
    //   text: tr("Curriculum"),
    //   icon: <AccountBalanceIcon />,
    //   url: path + "/curriculum"
    // }
  ];

  return {
    navigation
  };
};
