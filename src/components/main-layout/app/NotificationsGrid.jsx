import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useAppDispatch } from "@/lib/features/constants";
import { useSelector } from "react-redux";
import selectNotifications from "@/lib/features/notification/slices/notificationsMemoSelector";
import AlertBox from "../common/AlertBox";
import NotificationAPI from "@/lib/api/notification";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import { filteredNotificationsByIds } from "@/lib/features/notification/slices/notificationsSlice";
import { Button } from "@mui/material";
import APIWrapper from "@/lib/APIWrapper";

export default function NotificationGrid() {
  const dispatch = useAppDispatch();
  const notifications = useSelector(selectNotifications);
  const [selectedRows, setSelectedRows] = useState([]);
  const { deleteNotifications } = NotificationAPI();
  const [openDialogBoxYesNo, setOpenDialogBoxYesNo] = useState(false);
  const { logAlert } = APIWrapper();

  const onDeleteNotisClick = async () => {
    const idsObj = [{}];
    selectedRows.forEach((id) => idsObj.push({ id: id }));
    const deletedNotifs = await deleteNotifications(idsObj);

    if (deletedNotifs != undefined) {
      dispatch(filteredNotificationsByIds({ ids: selectedRows }));

      logAlert({
        message: deletedNotifs.message,
        description: "Потребителят си изтри нотификациите!",
        action: "Изтриване на нотификации",
        level: "success"
      });
    }

    setOpenDialogBoxYesNo(false);
  };

  const columns = [
    { field: "title", headerName: "Заглавие", flex: 1.5, minWidth: 400 },
    { field: "description", headerName: "Описание", flex: 1.5, minWidth: 700 },
    {
      field: "severity",
      headerName: "Приоритет",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 70
      // renderCell: (params) => {
      // 	return <>{params.value.severity}</>;
      // },
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
      <AlertBox />

      {selectedRows.length != 0 && (
        <Button variant="outlined" onClick={() => setOpenDialogBoxYesNo(true)}>
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
  );
}
