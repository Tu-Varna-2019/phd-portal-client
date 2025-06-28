import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Translate from "@/lib/helpers/Translate";

export const DashboardConstants = () => {
  const { tr } = Translate();

  const candidatesLabelStuct = [
    {
      name: tr("waiting"),
      value: 0,
      icon: <AccessTimeFilledIcon />,
      color: "hsl(220, 25%, 65%)"
    },
    {
      name: tr("approved"),
      value: 0,
      icon: <ThumbUpIcon />,
      color: "hsl(220, 25%, 65%)"
    },
    {
      name: tr("rejected"),
      value: 0,
      icon: <ThumbDownIcon />,
      color: "hsl(220, 25%, 45%)"
    }
  ];

  const candidatesPieChartStruct = [
    { label: tr("waiting"), value: 0 },
    { label: tr("approved"), value: 0 },
    { label: tr("rejected"), value: 0 }
  ];

  return {
    candidatesLabelStuct,
    candidatesPieChartStruct
  };
};
