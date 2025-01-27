import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useAppDispatch } from "@/lib/features/constants";
import { useSelector } from "react-redux";
import selectNotifications from "@/lib/features/notification/slices/notificationsMemoSelector";
import AlertBox from "../common/AlertBox";
import NotificationAPI from "@/lib/api/notification";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import { setNotifications } from "@/lib/features/notification/slices/notificationsSlice";
import { Button } from "@mui/material";
import {
  setAlertBoxMessage,
  setAlertBoxOpen
} from "@/lib/features/uiState/slices/uiStateSlice";
import LogsAPI from "@/lib/api/logs";

export default function NotificationGrid() {
  const dispatch = useAppDispatch();
  const notifications = useSelector(selectNotifications);
  const [selectedRows, setSelectedRows] = useState([]);
  const { deleteNotifications } = NotificationAPI();
  const [openDialogBoxYesNo, setOpenDialogBoxYesNo] = useState(false);
  const { saveLog } = LogsAPI();

  const onDeleteNotisClick = async () => {
    const idsObj = [{}];
    selectedRows.forEach((id) => idsObj.push({ id: id }));
    const deletedNotifs = await deleteNotifications(idsObj);

    if (deletedNotifs != undefined) {
      const newNotifications = notifications.filter(
        (row) => !selectedRows.includes(row.id)
      );
      dispatch(setNotifications(newNotifications));

      saveLog({
        description: "Потребителят си изтри нотификациите!",
        action: "Изтриване на нотификации",
        level: "INFO"
      });

      dispatch(setAlertBoxOpen(true));
      dispatch(setAlertBoxMessage(deletedNotifs.message));
    }

    setOpenDialogBoxYesNo(false);
  };

  const columns = [
    { field: "title", headerName: "Заглавие", flex: 1.5, minWidth: 400 },
    { field: "description", headerName: "Описание", flex: 1.5, minWidth: 800 },
    {
      field: "severity",
      headerName: "Приоритет",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 50
    },
    {
      field: "creation",
      headerName: "Време",
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 400
    }
  ];

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
          <>
            <DataGrid
              checkboxSelection
              onRowSelectionModelChange={(selectedRows) =>
                setSelectedRows(selectedRows)
              }
              rows={notifications}
              columns={columns}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              initialState={{
                pagination: { paginationModel: { pageSize: 50 } }
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
          <AlertBox />

          {selectedRows.length != 0 && (
            <Button
              variant="outlined"
              onClick={() => setOpenDialogBoxYesNo(true)}
            >
              Изтрии
            </Button>
          )}

          <ConfirmDialogYesNo
            title={"Изтриване на нотификации"}
            contentText={
              "Сигурни ли сте че искате да изтриете избраните нотификации?"
            }
            open={openDialogBoxYesNo}
            setOpen={setOpenDialogBoxYesNo}
            onButtonConfirmClick={onDeleteNotisClick}
          />
        </Box>
      </Grid>
    </Box>
  );
}
