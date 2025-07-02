import { renderAvatar } from "@/components/cells-renderers/avatar";
import FileAPI from "@/lib/api/file";
import Translate from "@/lib/helpers/Translate";
import { createDataUrl } from "@/lib/helpers/utils";

export default function CandidateConstants() {
  const { tr } = Translate();
  const { download } = FileAPI();

  // TODO: Move this to utils.jsx
  const downloadBiography = async (name, biography) => {
    const biographyData = await download(
      `candidates/${name}/biography/${biography}`
    );

    const dataUrl = await createDataUrl({
      file: biographyData,
      fileType: "blob"
    });
    window.open(dataUrl, "_blank", "noopener,noreferrer");
  };

  const examColumns = [
    {
      field: "avatar",
      headerName: tr("picture"),
      display: "flex",
      renderCell: renderAvatar,
      valueGetter: (_, row) =>
        row.evaluatedUser.name == null
          ? null
          : { name: row.evaluatedUser.name, color: row.avatar },
      sortable: true,
      filterable: false
    },
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
      field: "evaluatedUser.email",
      headerName: tr("email"),
      renderCell: (param) => {
        return param.row?.evaluatedUser.email;
      },
      flex: 1.5,
      minWidth: 200
    },
    {
      field: "commission name",
      headerName: tr("Name of the commission"),
      renderCell: (param) => {
        return param.row.commission.name;
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
    downloadBiography,
    examColumns,
    committeeColumns
  };
}
