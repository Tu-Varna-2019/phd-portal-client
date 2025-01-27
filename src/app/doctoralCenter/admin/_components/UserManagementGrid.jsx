import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserManagementGridData from "../_lib/UserManagementGridData";
import LoadingPageCircle from "@/components/loading/LoadingPageCircle";
import { DataGrid } from "@mui/x-data-grid";
import DoctoralCenterAPI from "@/lib/api/doctralCenter";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import NotificationAPI from "@/lib/api/notification";

import {
  setAlertBoxOpen,
  setAlertBoxMessage
} from "@/lib/features/uiState/slices/uiStateSlice";
import { useAppDispatch } from "@/lib/features/constants";
import AlertBox from "@/components/main-layout/common/AlertBox";

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

  const dispatch = useAppDispatch();
  const { deleteAuthorizedUser } = DoctoralCenterAPI();
  const { saveNotification } = NotificationAPI();

  const buttonConfirmOnClick = async () => {
    await deleteAuthorizedUser(selectedUser.oid, selectedUser.role);

    const description = `Потребителят ${selectedUser.name} е изтрит от в системата от роля: ${selectedUser.role}`;

    saveNotification({
      title: `Потребител ${selectedUser.name} е изтрит от системата`,
      description: description,
      severity: "info",
      scope: "group",
      group: "admin"
    });

    dispatch(setAlertBoxOpen(true));
    dispatch(setAlertBoxMessage(description));

    const updatedRows = rows.filter((elem) => elem.oid !== selectedUser.oid);
    setRows(updatedRows);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      ></Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Детайли
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Box>
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
            <>
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
            </>
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
      </Grid>
    </Box>
  );
}
