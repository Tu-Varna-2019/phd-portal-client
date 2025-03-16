import Box from "@mui/material/Box";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import AlertBox from "@/common/AlertBox";
import UserManagementHook from "../_hooks/UserManagementHook";
import Table from "@/components/main-layout/common/Table";

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
      <Table rows={users} columns={columns} />
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
