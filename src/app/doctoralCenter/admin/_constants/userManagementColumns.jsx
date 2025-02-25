import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";

export function UserManagementColunms(
  menuAnchor,
  setMenuAnchor,
  handleOpenMenu,
  onMenuClick,
  menuItemDisabled
) {
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
                disabled={menuItemDisabled()}
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
