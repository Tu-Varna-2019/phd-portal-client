import { renderAvatar } from "@/components/cells-renderers/avatar";
import { renderEmail } from "@/components/cells-renderers/email";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";

export function UserManagementColunms(
  selectedUserOid,
  currentUserOid,
  menuAnchor,
  setMenuAnchor,
  handleOpenMenu,
  onMenuClick
) {
  const columns = [
    {
      field: "avatar",
      headerName: "Снимка",
      display: "flex",
      renderCell: renderAvatar,
      valueGetter: (_, row) =>
        row.name == null ? null : { name: row.name, color: row.avatar },
      sortable: false,
      filterable: false
    },
    { field: "oid", headerName: "Oid", flex: 1.5, minWidth: 100 },
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
      minWidth: 100,
      renderCell: renderEmail
    },
    {
      field: "group",
      headerName: "Група",
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
      sortable: false,
      filterable: false,
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
                disabled={selectedUserOid == currentUserOid}
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
    columns
  };
}
