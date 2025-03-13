import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { path } from "./pathConstant";
import Translate from "@/lib/helpers/Translate";

export const SideMenuConstants = () => {
  const { tr } = Translate();

  const navigation = [
    {
      text: tr("Home"),
      icon: <HomeRoundedIcon />,
      url: path
    },
    {
      text: tr("Announcement of competitions"),
      icon: <AnnouncementIcon />,
      url: path + "/contests"
    },
    {
      text: tr("Candidate"),
      icon: <AppRegistrationIcon />,
      url: path + "/apply"
    }
  ];

  return {
    navigation
  };
};
