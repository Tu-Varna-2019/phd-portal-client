import { RenderStatusBagde } from "@/components/cells-renderers/statusBagde";
import Translate from "@/lib/helpers/Translate";

export default function NotificationConstants() {
  const { tr } = Translate();

  const columns = [
    { field: "title", headerName: tr("title"), flex: 1.5, minWidth: 400 },
    {
      field: "description",
      headerName: tr("description"),
      flex: 1.5,
      minWidth: 700
    },
    {
      field: "severity",
      headerName: tr("priority"),
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 70,
      renderCell: (param) => {
        return <RenderStatusBagde row={param.row?.severity} />;
      }
    },
    {
      field: "creation",
      headerName: tr("time"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 400
    }
  ];

  return {
    columns
  };
}
