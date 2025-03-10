import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { path } from "./pathConstant";

export const sideMenu = [
  {
    text: "Началнo",
    icon: <HomeRoundedIcon />,
    url: path
  },
  {
    text: "Обявяване на конкурси",
    icon: <AnnouncementIcon />,
    url: path + "/contests"
  },
  {
    text: "Кандидатствай",
    icon: <AppRegistrationIcon />,
    url: path + "/apply"
  }
];
