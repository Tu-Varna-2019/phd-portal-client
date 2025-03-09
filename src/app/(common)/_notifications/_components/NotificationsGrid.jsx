import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import { Button } from "@mui/material";
import NotificationHook from "../_hooks/NotificationsHook";
import { columns } from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";

export default function NotificationsGrid() {
  const {
    setOpenDialogBoxYesNo,
    selectedRows,
    notifications,
    setSelectedRows,
    onDeleteNotisClick,
    openDialogBoxYesNo
  } = NotificationHook();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Table
        rows={notifications}
        columns={columns}
        checkboxEnabled={true}
        onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
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
