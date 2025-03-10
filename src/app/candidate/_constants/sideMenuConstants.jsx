import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ContactsIcon from "@mui/icons-material/Contacts";

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
    text: "Допуснати до изпит кандидат докторанти",
    icon: <PersonSearchIcon />,
    url: path + "/in-review"
  },
  {
    text: "Контакти",
    icon: <ContactsIcon />,
    url: path + "/contacts"
  }
];
