import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import AlertBox from "@/common/AlertBox";
import { UserManagementHook } from "../_hooks/userManagementHook";

export default function UserManagementGrid() {
  const {
    buttonConfirmOnClick,
    users,
    dialogTitle,
    dialogContent,
    columns,
    openDialogBoxYesNo,
    setOpenDialogBoxYesNo
  } = UserManagementHook();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } }
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: "outlined",
                size: "small"
              },
              columnInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" }
              },
              operatorInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" }
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: "outlined",
                  size: "small"
                }
              }
            }
          }
        }}
      />
      <AlertBox />

      <ConfirmDialogYesNo
        title={dialogTitle}
        contentText={dialogContent}
        onButtonConfirmClick={buttonConfirmOnClick}
        open={openDialogBoxYesNo}
        setOpen={setOpenDialogBoxYesNo}
      />
    </Box>
  );
}
