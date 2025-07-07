import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks4";
import Looks6Icon from "@mui/icons-material/Looks4";
import Looks3Icon from "@mui/icons-material/Looks3";

import Translate from "@/lib/helpers/Translate";

export const HomeConstants = () => {
  const { tr } = Translate();

  const examLabelStuct = [
    {
      name: tr("two"),
      value: 0,
      icon: <LooksTwoIcon />,
      color: "hsl(220, 25%, 65%)"
    },
    {
      name: tr("three"),
      value: 0,
      icon: <Looks3Icon />,
      color: "hsl(220, 25%, 65%)"
    },
    {
      name: tr("four"),
      value: 0,
      icon: <Looks4Icon />,
      color: "hsl(220, 25%, 45%)"
    },
    {
      name: tr("five"),
      value: 0,
      icon: <Looks5Icon />,
      color: "hsl(220, 25%, 45%)"
    },
    {
      name: tr("six"),
      value: 0,
      icon: <Looks6Icon />,
      color: "hsl(220, 25%, 45%)"
    }
  ];

  const examPieChartStruct = [
    { label: tr("two"), value: 0 },
    { label: tr("three"), value: 0 },
    { label: tr("four"), value: 0 },
    { label: tr("five"), value: 0 },
    { label: tr("six"), value: 0 }
  ];

  return {
    examLabelStuct,
    examPieChartStruct
  };
};
