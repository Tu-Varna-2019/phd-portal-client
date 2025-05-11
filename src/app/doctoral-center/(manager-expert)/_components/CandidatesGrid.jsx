import Box from "@mui/material/Box";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import CandidateConstants from "../_constants/CandidatesConstants";
import CandidatesHook from "../_hooks/CandidatesHook";

export default function CandidatesGrid() {
  const {
    candidates,
    buttonConfirmOnClick,
    openDialogBoxYesNo,
    dialogTitle,
    dialogContent,
    setOpenDialogBoxYesNo
  } = CandidatesHook();

  const { columns } = CandidateConstants();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Table rows={candidates} columns={columns} checkboxEnabled />
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
