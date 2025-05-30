"use client";
import { renderLink } from "@/components/cells-renderers/link";
import Translate from "@/lib/helpers/Translate";
import { useMemo } from "react";

export default function CandidateColumnConstants(
  faculties,
  curriculumsByFaculty
) {
  const { tr, language } = Translate();
  const curriculumLinkMapper = {
    "Автоматизирани системи за обработка и управление на информация":
      "automated-information-processing-and-management-systems",
    "Automated information processing and management systems":
      "automated-information-processing-and-management-systems"
  };

  const curriculumColumns = useMemo(
    () => [
      {
        field: "name",
        headerName: tr("naming"),
        flex: 1.5,
        minWidth: 700,
        renderCell: (param) =>
          renderLink(
            param.row.name,
            "curriculum/" + curriculumLinkMapper[param.row.name]
          )
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
      }
    ],
    [language, curriculumsByFaculty]
  );

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

  const facultiesColumns = useMemo(
    () => [
      {
        field: "name",
        headerName: tr("faculty"),
        flex: 1.5,
        minWidth: 700
      }
    ],
    [language, faculties]
  );

  return {
    facultiesColumns,
    candidatesInReviewColumns,
    contestsColumns,
    curriculumColumns
  };
}
