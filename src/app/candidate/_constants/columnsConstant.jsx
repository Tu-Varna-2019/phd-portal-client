import { renderLink } from "@/components/cells-renderers/link";
import Translate from "@/lib/helpers/Translate";

export default function CandidateColumnConstants() {
  const { tr } = Translate();

  const curriculumColumns = [
    {
      field: "name",
      headerName: tr("naming"),
      flex: 1.5,
      minWidth: 700,
      renderCell: (param) => renderLink(param.row.name, "candidate/curriculum/")
    },
    {
      field: "yearPeriod",
      headerName: tr("Study period (years)"),
      flex: 1.5,
      minWidth: 170
    },
    {
      field: "mode",
      headerName: tr("Mode of studying"),
      flex: 1.5,
      minWidth: 200
    },
    {
      field: "faculty",
      headerName: tr("faculty"),
      flex: 1.5,
      minWidth: 400
    }
  ];

  const contestsColumns = [
    {
      field: "name",
      headerName: tr("name"),
      flex: 1.5,
      minWidth: 700
    },
    {
      field: "yearAccepted",
      headerName: tr("Year of admission"),
      flex: 1.5,
      minWidth: 170
    },
    {
      field: tr("faculty"),
      headerName: "Катедра",
      flex: 1.5,
      minWidth: 400
    }
  ];

  const candidatesInReviewColumns = [
    {
      field: "name",
      headerName: tr("name"),
      flex: 1.5,
      minWidth: 700
    },
    {
      field: "faculty",
      headerName: tr("faculty"),
      flex: 1.5,
      minWidth: 400
    }
  ];

  const facultiesColumns = [
    {
      field: "name",
      headerName: tr("faculty"),
      flex: 1.5,
      minWidth: 700
    }
  ];

  const subjectsColumns = [
    {
      field: "name",
      headerName: tr("subject"),
      flex: 1.5,
      minWidth: 700
    }
  ];

  return {
    subjectsColumns,
    facultiesColumns,
    candidatesInReviewColumns,
    contestsColumns,
    curriculumColumns
  };
}
