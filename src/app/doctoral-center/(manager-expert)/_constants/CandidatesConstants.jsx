import { renderAvatar } from "@/components/cells-renderers/avatar";
import { renderButton } from "@/components/cells-renderers/button";
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
    {
      field: "name",
      headerName: tr("name"),
      display: "flex"
    },
    { field: "email", headerName: tr("email"), flex: 1.5, minWidth: 200 },
    {
      field: "pin",
      headerName: tr("pin"),
      flex: 1,
      minWidth: 150
    },
    {
      field: "post_code",
      headerName: tr("post_code"),
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 100
    },
    {
      field: "country",
      headerName: tr("country"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    },
    {
      field: "city",
      headerName: tr("city"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    },

    {
      field: "address",
      headerName: tr("address"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    },

    {
      field: "faculty",
      headerName: tr("faculty"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    },

    {
      field: "biography",
      headerName: tr("biography"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300,
      renderCell: (param) =>
        renderButton(param.row.biography, () =>
          downloadBiography(param.row.name, param.row.biography)
        )
    },

    {
      field: "curriculum",
      headerName: tr("curriculum"),
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    }
  ];

  const examColumns = [
    {
      field: "grade",
      headerName: tr("grade"),
      display: "flex",
      renderCell: renderAvatar,
      sortable: true,
      filterable: false
    },
    {
      field: "evalDate",
      headerName: tr("evaluation date"),
      display: "flex"
    },
    { field: "email", headerName: tr("email"), flex: 1.5, minWidth: 200 },
    {
      field: "commision name",
      headerName: tr("name of the commision"),
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

  return {
    columns,
    downloadBiography,
    examColumns
  };
}
