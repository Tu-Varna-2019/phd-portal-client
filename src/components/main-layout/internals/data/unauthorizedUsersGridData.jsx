import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { formatDateTime } from "@/lib/utils";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function renderStatus(status) {
  const colors = {
    Online: "success",
    Offline: "default"
  };
  return <Chip label={status} color={colors[status]} size="small" />;
}

const fetchUnauthorizedUsers = async (accessToken) => {
  try {
    const response = await fetch("/api/doctoralCenter/getUnauthorized", {
      method: "GET",
      headers: {
        Authorization: accessToken
      }
    });
    const result = await response.json();
    return result.data;
  } catch (exception) {
    console.error(`Server error when trying to log in ${exception}`);
  }
};

export default function UnauthorizedUsersData() {
  const initialRows = [
    {
      id: 1,
      oid: "N/A",
      name: "N/A",
      email: "N/A",
      timestamp: 0,
      role: "N/A"
    }
  ];

  const [rows, setRows] = useState(initialRows);
  const sessionToken = useSelector(selectSessionToken);

  useEffect(() => {
    const getUnauthorizedUsers = async () => {
      const unauthorizedUsers = await fetchUnauthorizedUsers(
        sessionToken.accessToken
      );

      // NOTE: Format datetime
      unauthorizedUsers.forEach((user) => {
        const userTimestamp = user.timestamp;
        user.timestamp = formatDateTime(userTimestamp);
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
      flex: 0.5,
      minWidth: 80
    },
    {
      field: "email",
      headerName: "Емейл",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 80
    },
    {
      field: "timestamp",
      headerName: "Време на достъп",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => renderStatus(params.value)
    },
    {
      field: "role",
      headerName: "Разреши достъп",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 120
    }
  ];
  return {
    rows,
    columns
  };
}
