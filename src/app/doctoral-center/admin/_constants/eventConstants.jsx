import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import { StyledChip } from "@/components/shared-theme/StyledTheme";
import { RenderStatusBagde } from "@/components/cells-renderers/statusBagde";

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
      return <RenderStatusBagde row={param.row.level} />;
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
