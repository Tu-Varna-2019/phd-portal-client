import { RenderStatusBagde } from "@/components/cells-renderers/statusBagde";
import Translate from "@/lib/helpers/Translate";

export default function EventManagementConstants() {
  const { tr } = Translate();

  const eventColumns = [
    {
      field: "description",
      headerName: tr("description"),
      flex: 1.5,
      minWidth: 300
    },
    {
      field: "formattedTimestamp",
      headerName: tr("time"),
      flex: 1,
      minWidth: 250
    },
    {
      field: "action",
      headerName: tr("action"),
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 350
    },
    {
      field: "level",
      headerName: tr("level"),
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
      headerName: tr("name"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    },
    {
      field: "email",
      headerName: tr("email"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    },
    {
      field: "group",
      headerName: tr("group"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    }
  ];

  return {
    eventColumns
  };
}
