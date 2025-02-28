import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export const candidatesLabelStuct = [
  {
    name: "Чакащи",
    value: 0,
    icon: <AccessTimeFilledIcon />,
    color: "hsl(220, 25%, 65%)"
  },
  {
    name: "Приети",
    value: 0,
    icon: <ThumbUpIcon />,
    color: "hsl(220, 25%, 65%)"
  },
  {
    name: "Отказани",
    value: 0,
    icon: <ThumbDownIcon />,
    color: "hsl(220, 25%, 45%)"
  }
];

export const candidatesPieChartStruct = [
  { label: "Чакащи", value: 0 },
  { label: "Приети", value: 0 },
  { label: "Отказани", value: 0 }
];
