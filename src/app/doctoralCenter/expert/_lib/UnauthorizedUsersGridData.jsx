import UnauthorizedUsers from "@/models/UnauthorizedUsers";
import { useEffect, useState } from "react";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import { runPeriodically } from "@/lib/helpers/utils";

export default function UnauthorizedUsersGridData() {
  const [rows, setRows] = useState([new UnauthorizedUsers()]);
  const { fetchUnauthorizedUsers } = DoctoralCenterAPI();

  useEffect(() => {
    const getUnauthorizedUsers = async () => {
      const unauthorizedUsers = await fetchUnauthorizedUsers();

      if (unauthorizedUsers != null) {
        setRows(UnauthorizedUsers.getList(unauthorizedUsers));
      }
    };

    getUnauthorizedUsers();
    runPeriodically(() => {
      getUnauthorizedUsers();
    });
  }, [setRows]);

  const columns = [
    { field: "oid", headerName: "Oid", flex: 1.5, minWidth: 200 },
    {
      field: "name",
      headerName: "Име",
      flex: 1,
      minWidth: 150
    },
    {
      field: "email",
      headerName: "Имейл",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 80
    },
    {
      field: "formattedTimestamp",
      headerName: "Време на достъп",
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    }
  ];

  const setRowsByParam = (rows) => {
    setRows(rows);
  };
  return {
    rows,
    columns,
    setRowsByParam
  };
}
