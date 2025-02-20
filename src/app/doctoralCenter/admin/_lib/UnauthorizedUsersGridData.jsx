import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";

import Checkbox from "@mui/material/Checkbox";
import UnauthorizedUsers from "@/models/UnauthorizedUsers";
import { useEffect, useState } from "react";
import APIWrapper from "@/lib/helpers/APIWrapper";

export default function UnauthorizedUsersGridData() {
  const [rows, setRows] = useState([new UnauthorizedUsers()]);
  const { fetchUnauthorizedUsers, setUnauthorizedUserIsAllowed } =
    DoctoralCenterAdminAPI();

  const { logNotifyAlert, logAlert } = APIWrapper();

  const changeIsAllowedOnClick = async (oid, email, isAllowed) => {
    const result = await setUnauthorizedUserIsAllowed(oid, isAllowed);

    if (result != []) {
      const allowedMsg = isAllowed ? "позволен" : "забранен";

      logNotifyAlert({
        title: `Неудостоверен потребител ${allowedMsg} в системата`,
        description: `Неудостоверен потребител ${email} е ${allowedMsg} в системата`,
        message: `Неудостоверен потребител ${email} е ${allowedMsg} в системата`,
        action: `Неудостоверен потребител ${email} е ${allowedMsg} в системата`,
        level: "success",
        scope: "group",
        group: "admin"
      });
    } else {
      logAlert({
        message: `Проблем при сменяне на позволяване статуса на неудостоверен потребител`,
        description: `Проблем при сменяне на позволяване статуса на неудостоверен потребител`,
        action:
          "Пробем при смяна на позволяване статус неудостоверен потребител",
        level: "error"
      });
    }
  };

  useEffect(() => {
    let interval;
    const getUnauthorizedUsers = async () => {
      const unauthorizedUsers = await fetchUnauthorizedUsers();

      if (unauthorizedUsers != null) {
        setRows(UnauthorizedUsers.getList(unauthorizedUsers));
      }
    };

    getUnauthorizedUsers();
    interval = setInterval(() => {
      getUnauthorizedUsers();
    }, process.env.NEXT_PUBLIC_FETCH_API_DURATION);
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
    },
    {
      field: "isAllowed",
      headerName: "Позволен ли е в систематай",
      sortable: false,
      headerAlign: "center",
      align: "center",
      filterable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <Checkbox
            id={params.row.oid}
            checked={
              params.row.isAllowed == undefined ? false : params.row.isAllowed
            }
            onChange={() => {
              params.row.isAllowed = !params.row.isAllowed;
              changeIsAllowedOnClick(
                params.row.oid,
                params.row.email,
                params.row.isAllowed
              );
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      }
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
