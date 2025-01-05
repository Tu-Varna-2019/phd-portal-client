import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const fetchAuthUsers = async (accessToken) => {
  try {
    const response = await fetch("/api/doctoralCenter/admin/authenthicated", {
      method: "GET",
      headers: {
        Authorization: accessToken
      }
    });
    const result = await response.json();
    return result.data;
  } catch (exception) {
    console.error(
      `Server error when trying to fetch authenticated users in ${exception}`
    );
  }
};

export default function UserManagementData() {
  const [rows, setRows] = useState([]);
  const sessionToken = useSelector(selectSessionToken);

  useEffect(() => {
    const getAuthUsers = async () => {
      const authUsers = await fetchAuthUsers(sessionToken.accessToken);
      setRows(authUsers);
    };

    getAuthUsers();
  }, [setRows]);

  const columns = [
    { field: "oid", headerName: "Oid", flex: 1.5, minWidth: 200 },
    {
      field: "name",
      headerName: "Име",
      flex: 1,
      minWidth: 200
    },
    {
      field: "email",
      headerName: "Имейл",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 300
    },
    {
      field: "role",
      headerName: "Роля",
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 150
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
