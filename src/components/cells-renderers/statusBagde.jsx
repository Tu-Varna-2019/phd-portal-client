import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import { StyledChip } from "@/components/shared-theme/StyledTheme";

export const RenderStatusBagde = ({ row }) => {
  let icon,
    color = null;

  if (row == "info" || row == "Информация") {
    icon = <InfoIcon />;
    color = "info";
  } else if (row == "success" || row == "Успех") {
    icon = <CheckCircleIcon color="success" />;
    color = "success";
  } else if (row == "error" || row == "Грешка") {
    icon = <ErrorIcon />;
    color = "error";
  }

  return (
    <StyledChip
      icon={icon}
      size="small"
      label={row}
      variant="outlined"
      color={color}
    />
  );
};
