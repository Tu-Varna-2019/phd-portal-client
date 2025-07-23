import { renderAvatar } from "@/components/cells-renderers/avatar";
import FileAPI from "@/api/FileAPI";
import Translate from "@/lib/helpers/Translate";

export default function ExamsConstants() {
  const { tr } = Translate();
  FileAPI();

  // TODO: Move this to utils.jsx

  const examColumns = [
    {
      field: "grade",
      headerName: tr("grade"),
      display: "flex",
      sortable: true,
      filterable: false
    },
    {
      field: "evalDate",
      headerName: tr("evaluation date"),
      display: "flex"
    },
    {
      field: "commission name",
      headerName: tr("Name of the commission"),
      renderCell: (param) => {
        const commission = param.row.commission;
        return commission == null ? null : commission.name;
      },
      flex: 1,
      minWidth: 150
    },
    {
      field: "report",
      headerName: tr("report"),
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 100
    },
    {
      field: "subject",
      headerName: tr("subject"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    }
  ];

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
      field: "grade",
      headerName: tr("grade"),
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

  return {
    examColumns,
    committeeColumns
  };
}
