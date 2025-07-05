import { renderAvatar } from "@/components/cells-renderers/avatar";
import Translate from "@/lib/helpers/Translate";

export default function CommissionsConstants() {
  const { tr } = Translate();

  const committeeColumns = [
    {
      field: "avatar",
      headerName: tr("picture"),
      display: "flex",
      align: "center",
      renderCell: renderAvatar,
      // TODO: download committee's profile picture
      valueGetter: (_, row) =>
        row.name == null ? null : { name: row.name, color: row.avatar },
      sortable: false,
      filterable: false
    },
    {
      field: "name",
      headerName: tr("name"),
      align: "center",
      display: "flex",
      sortable: true,
      filterable: false
    },
    {
      field: "email",
      headerName: tr("email"),
      display: "flex",
      align: "center",
      sortable: true,
      filterable: false
    },
    {
      field: "role",
      headerName: tr("role"),
      display: "flex",
      align: "center",
      sortable: true,
      filterable: false
    }
  ];

  const commissionColumns = [
    {
      field: "avatar",
      headerName: tr("picture"),
      display: "flex",
      align: "center",
      renderCell: renderAvatar,
      // TODO: download committee's profile picture
      valueGetter: (_, row) =>
        row.name == null ? null : { name: row.name, color: row.avatar },
      sortable: false,
      filterable: false
    },
    {
      field: "name",
      headerName: tr("name"),
      align: "left",
      display: "flex",
      flex: 200,
      sortable: true,
      filterable: false
    }
  ];

  return {
    commissionColumns,
    committeeColumns
  };
}
