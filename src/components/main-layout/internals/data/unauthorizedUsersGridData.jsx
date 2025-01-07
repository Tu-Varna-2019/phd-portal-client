import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { formatDateTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const fetchUnauthorizedUsers = async (accessToken) => {
  try {
    const response = await fetch(
      "/api/doctoralCenter/admin/unauthorized-users",
      {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }
    );
    const result = await response.json();
    return result.data;
  } catch (exception) {
    console.error(
      `Server error when trying to fetch unauthorized users in ${exception}`
    );
  }
};

export default function UnauthorizedUsersData() {
  const [rows, setRows] = useState([]);

  const sessionToken = useSelector(selectSessionToken);

  useEffect(() => {
    const getUnauthorizedUsers = async () => {
      const unauthorizedUsers = await fetchUnauthorizedUsers(
        sessionToken.accessToken
      );

      // NOTE: Format datetime
      unauthorizedUsers.forEach((user) => {
        const userTimestamp = user.timestamp;
        user.formattedTimestamp = formatDateTime(userTimestamp);
      });
      setRows(unauthorizedUsers);
    };

    getUnauthorizedUsers();
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
