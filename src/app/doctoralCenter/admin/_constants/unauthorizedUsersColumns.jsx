import { Checkbox } from "@mui/material";
import { renderAvatar } from "@/components/cells-renderers/avatar";
import { renderEmail } from "@/components/cells-renderers/email";

export function UnauthorizedUsersColunms(changeIsAllowedOnClick) {
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
      minWidth: 100,
      renderCell: renderEmail
    },
    {
      field: "formattedTimestamp",
      headerName: "Време на достъп",
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 200
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

  return {
    columns
  };
}
