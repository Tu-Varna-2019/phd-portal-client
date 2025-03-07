import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import { StyledChip } from "@/components/shared-theme/StyledTheme";

export const eventColumns = [
  { field: "description", headerName: "Описание", flex: 1.5, minWidth: 200 },
  {
    field: "formattedTimestamp",
    headerName: "Време",
    flex: 1,
    minWidth: 250
  },
  {
    field: "action",
    headerName: "Действие",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 250
  },
  {
    field: "level",
    headerName: "Ниво",
    headerAlign: "right",
    align: "right",
    flex: 2,
    minWidth: 100,
    renderCell: (param) => {
      const level = param.row.level;

      let icon,
        color = null;
      if (level == "info" || level == "Информация") {
        icon = <InfoIcon />;
        color = "info";
      } else if (level == "success" || level == "Успех") {
        icon = <CheckCircleIcon color="success" />;
        color = "success";
      } else if (level == "error" || level == "Грешка") {
        icon = <ErrorIcon />;
        color = "error";
      }

      return (
        <StyledChip
          icon={icon}
          size="small"
          label={level}
          variant="outlined"
          color={color}
        />
      );
    }
  },
  {
    field: "oid",
    headerName: "Oid",
    headerAlign: "right",
    align: "right",
    flex: 2,
    minWidth: 300
  },
  {
    field: "name",
    headerName: "Име",
    headerAlign: "right",
    align: "right",
    flex: 2,
    minWidth: 300
  },
  {
    field: "email",
    headerName: "Имейл",
    headerAlign: "right",
    align: "right",
    flex: 2,
    minWidth: 300
  },
  {
    field: "group",
    headerName: "Група",
    headerAlign: "right",
    align: "right",
    flex: 2,
    minWidth: 300
  }
];
