import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserManagementGridData from "../_lib/UserManagementGridData";
import LoadingPageCircle from "@/components/loading/LoadingPageCircle";
import { DataGrid } from "@mui/x-data-grid";
import DoctoralCenterAPI from "@/lib/api/doctralCenter";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import AlertBox from "@/components/main-layout/common/AlertBox";
import APIWrapper from "@/lib/APIWrapper";

export default function UserManagementGrid() {
  const {
    rows,
    dialogTitle,
    dialogContent,
    columns,
    openDialogBoxYesNo,
    setOpenDialogBoxYesNo,
    selectedUser,
    setRows,
    getAuthorizedUsers
  } = UserManagementGridData();

  const { logNotifyAlert } = APIWrapper();
  const { deleteAuthorizedUser } = DoctoralCenterAPI();

  const buttonConfirmOnClick = async () => {
    await deleteAuthorizedUser(selectedUser.oid, selectedUser.role);

    logNotifyAlert({
      title: `Потребител ${selectedUser.name} е изтрит от системата`,
      description: `Потребителят ${selectedUser.name} е изтрит от в системата от роля: ${selectedUser.role}`,
      message: "Грешка при качването на снимката!",
      action: "Потребител смени снимка",
      level: "success",
      scope: "group",
      group: "admin"
    });

    const updatedRows = rows.filter((elem) => elem.oid !== selectedUser.oid);
    setRows(updatedRows);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {getAuthorizedUsers ? (
        <>
          <Typography
            textAlign="center"
            alignItems="center"
            justifyContent="center"
          >
            Моля изчакайте
          </Typography>
          <LoadingPageCircle />
        </>
      ) : (
        <DataGrid
          rows={rows}
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
      )}

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
