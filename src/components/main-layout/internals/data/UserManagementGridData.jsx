import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";

const fetchAuthUsers = async (accessToken) => {
  try {
    const response = await fetch("/api/doctoralCenter/admin/authenticated", {
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
  const [menuAnchor, setMenuAnchor] = useState(false);
  const [openDialogBoxYesNo, setOpenDialogBoxYesNo] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [selectedUser, setSelectedUser] = useState();

  const sessionToken = useSelector(selectSessionToken);
  const doctoralCenter = useSelector(selectDoctoralCenter);

  useEffect(() => {
    const getAuthUsers = async () => {
      const authUsers = await fetchAuthUsers(sessionToken.accessToken);
      setRows(authUsers);
    };

    getAuthUsers();
  }, [sessionToken?.accessToken, setRows]);

  const handleOpenMenu = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedUser(row);
  };

  const onMenuClick = (option) => {
    switch (option) {
      case "delete":
        setDialogTitle(`Изтриване на потребител: ${selectedUser.name} `);
        setDialogContent(
          `Сигурни ли сте че искате да изтриете потребитеря: ${selectedUser.name} ?`
        );
        setOpenDialogBoxYesNo(true);
        setMenuAnchor(false);
        break;
      default:
        console.error("Menu option not found!!");
        break;
    }
  };

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
    },
    {
      field: "actions",
      headerName: "Действия",
      sortable: false,
      headerAlign: "center",
      align: "center",
      filterable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <MenuIcon
              onClick={(event) => handleOpenMenu(event, params.row)}
            ></MenuIcon>

            <Menu
              anchorEl={menuAnchor}
              open={menuAnchor}
              onClose={() => setMenuAnchor(false)}
            >
              <MenuItem
                onClick={() => onMenuClick("delete")}
                disabled={selectedUser?.oid == doctoralCenter.oid}
              >
                Премахни
              </MenuItem>
            </Menu>
          </>
        );
      }
    }
  ];

  return {
    rows,
    columns,
    openDialogBoxYesNo,
    setOpenDialogBoxYesNo,
    selectedUser,
    setRows,
    dialogTitle,
    dialogContent
  };
}
