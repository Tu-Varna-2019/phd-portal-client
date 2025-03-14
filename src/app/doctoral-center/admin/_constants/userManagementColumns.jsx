import { renderAvatar } from "@/components/cells-renderers/avatar";
import { renderEmail } from "@/components/cells-renderers/email";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import ContextMenu from "../_components/ContextMenu";

export function UserManagementColunms(
  menuAnchor,
  setMenuAnchor,
  selectedUserOid,
  currentUserOid,
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
            <LinearScaleIcon
              onClick={(event) => handleOpenMenu(event, params.row)}
            ></LinearScaleIcon>

            <ContextMenu
              menuAnchor={menuAnchor}
              setMenuAnchor={setMenuAnchor}
              onDeleteClick={() => onMenuClick("delete")}
              deleteDisabled={selectedUserOid == currentUserOid}
            />
          </>
        );
      }
    }
  ];

  return {
    columns
  };
}
