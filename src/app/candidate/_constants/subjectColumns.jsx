"use client";
import { Checkbox } from "@mui/material";
import { useMemo } from "react";
import Translate from "@/lib/helpers/Translate";

export default function SubjectColumns({ selectedRows, setSelectedRows }) {
  const { tr, language } = Translate();

  const onCheckBoxChange = (rowId) => {
    setSelectedRows((prev) => {
      const isCheckboxChecked = prev.includes(rowId);

      if (isCheckboxChecked) {
        return prev.filter((id) => id !== rowId);
      } else {
        return [...prev, rowId];
      }
    });
  };

  const subjectsColumns = useMemo(
    () => [
      {
        field: "select",
        headerName: "",
        width: 50,
        renderCell: (params) => {
          const isChecked = selectedRows.includes(params.id);
          const mandatoryRows = [0, 1, 2];
          return (
            <Checkbox
              checked={isChecked}
              onChange={() => onCheckBoxChange(params.id)}
              disabled={
                selectedRows.length == 6 || mandatoryRows.includes(params.id)
              }
            />
          );
        }
      },
      {
        field: "name",
        headerName: tr("subject"),
        flex: 1.5,
        minWidth: 700
      }
    ],
    [language, selectedRows]
  );

  return {
    subjectsColumns
  };
}
