import { renderAvatar } from "@/components/cells-renderers/avatar";
import { renderEmail } from "@/components/cells-renderers/email";
import Translate from "@/lib/helpers/Translate";

export default function UnauthorizedUsersConstants() {
  const { tr } = Translate();

  const columns = [
    {
      field: "avatar",
      headerName: tr("picture"),
      display: "flex",
      renderCell: renderAvatar,
      valueGetter: (_, row) =>
        row.name == null ? null : { name: row.name, color: row.avatar },
      sortable: false,
      filterable: false
    },
    { field: "oid", headerName: "Oid", flex: 1.5, minWidth: 200 },
    {
      field: "name",
      headerName: tr("name"),
      flex: 1,
      minWidth: 150
    },
    {
      field: "email",
      headerName: tr("email"),
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 100,
      renderCell: renderEmail
    },
    {
      field: "formattedTimestamp",
      headerName: tr("Time for access"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    }
  ];
  return {
    columns
  };
}
