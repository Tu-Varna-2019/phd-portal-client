import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import { Button } from "@mui/material";
import NotificationHook from "../_hooks/NotificationsHook";
import NotificationConstants from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import Translate from "@/lib/helpers/Translate";

export default function NotificationsGrid() {
  const {
    setOpenDialogBoxYesNo,
    selectedRows,
    notifications,
    setSelectedRows,
    onDeleteNotisClick,
    openDialogBoxYesNo
  } = NotificationHook();
  const { tr } = Translate();
  const { columns } = NotificationConstants();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Table
        rows={notifications}
        columns={columns}
        checkboxEnabled
        onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
      />
      <AlertBox />

      {selectedRows.length != 0 && (
        <Button variant="outlined" onClick={() => setOpenDialogBoxYesNo(true)}>
          {tr("delete")}
        </Button>
      )}

      <ConfirmDialogYesNo
        title={tr("Deletion of notifications")}
        contentText={tr(
          "Are you sure you want to delete the selected notifications?"
        )}
        open={openDialogBoxYesNo}
        setOpen={setOpenDialogBoxYesNo}
        onButtonConfirmClick={onDeleteNotisClick}
      />
    </Box>
  );
}
