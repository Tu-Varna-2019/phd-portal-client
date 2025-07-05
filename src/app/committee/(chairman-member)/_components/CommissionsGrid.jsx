import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import {
  Button,
  ButtonGroup,
  Divider,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Translate from "@/lib/helpers/Translate";
import EditIcon from "@mui/icons-material/Edit";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import CommissionsHook from "../_hooks/CommissionsHook";
import CommissionsConstants from "../_constants/commissionsConstants";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import { validateTextNotEmpty } from "@/lib/helpers/validate";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CommissionsGrid() {
  const { tr } = Translate();
  const {
    signedCommittee,
    commissions,
    selectedCommission,
    setSelectedCommission,
    isModifyCommissionOpened,
    setIsModifyCommissionOpened,
    isCreateCommissionOpened,
    setIsCreateCommissionOpened,
    selectedCommittees,
    setSelectedCommittees,
    newCommissionName,
    allCommittees,
    setNewCommissionName,
    onCreateCommissionOnClick,
    onModifyCommissionOnClick,
    onDeleteCommissionOnClick,
    isCommissionOpened,
    setIsCommissionOpened,
    openConfirmCreateDialogYesNo,
    setOpenConfirmCreateDialogYesNo,
    openConfirmModifyDialogYesNo,
    setOpenConfirmModifyDialogYesNo,
    openConfirmDeleteDialogYesNo,
    setOpenConfirmDeleteDialogYesNo
  } = CommissionsHook();
  const { commissionColumns, committeeColumns } = CommissionsConstants();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Table
        rows={commissions}
        columns={commissionColumns}
        checkboxEnabled
        onRowSelect={(index) => {
          if (commissions[index] != undefined)
            setSelectedCommission(commissions[index]);
          setIsCommissionOpened(true);
        }}
      />
      <Button
        color="info"
        size="medium"
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setIsCreateCommissionOpened(true)}
        sx={{ marginRight: 2 }}
      >
        {tr("Create")}
      </Button>

      <AlertBox />
      <OverflowBox open={isCommissionOpened} setOpen={setIsCommissionOpened}>
        {isCommissionOpened && (
          <>
            <Typography
              component="h2"
              variant="h6"
              sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
            >
              {tr("Details")}
            </Typography>

            <Stack direction="column" spacing={2} sx={{ textAlign: "left" }}>
              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("name")}:</strong> {selectedCommission.name}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Committees")}:</strong>{" "}
              </Typography>

              <Table
                rows={selectedCommission.committees}
                columns={committeeColumns}
                density="comfortable"
              />

              {signedCommittee.role.role == "chairman" && (
                <Button
                  color="info"
                  size="medium"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setIsModifyCommissionOpened(true)}
                  sx={{ marginRight: 2 }}
                >
                  {tr("Modify")}
                </Button>
              )}
            </Stack>
          </>
        )}
      </OverflowBox>
      <OverflowBox
        open={isModifyCommissionOpened}
        setOpen={setIsModifyCommissionOpened}
      >
        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("Name")}:</strong>
        </Typography>

        <TextField
          id="name"
          value={newCommissionName}
          onChange={(event) => setNewCommissionName(event.target.value)}
          error={() => !validateTextNotEmpty(newCommissionName)}
          helperText={
            !validateTextNotEmpty(newCommissionName)
              ? tr("commission") + " " + tr("must not be empty!")
              : ""
          }
          name="name"
          type="name"
          placeholder="Комисия 1"
          autoComplete="name"
          required
          size="small"
        />
        <Divider />

        <Table
          checkboxEnabled={true}
          onRowSelect={(selectedRows) => setSelectedCommittees(selectedRows)}
          selectedRows={selectedCommittees}
          density="comfortable"
          rows={allCommittees}
          onRowSelectDisable={(param) => param.row.oid != signedCommittee.oid}
          columns={committeeColumns}
        />

        <ButtonGroup
          variant="outlined"
          aria-label="Modify/Delete commission"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "background.paper",
            boxShadow: 3
          }}
        >
          <Button
            color="info"
            size="medium"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setOpenConfirmModifyDialogYesNo(true)}
            disabled={
              !validateTextNotEmpty(newCommissionName) ||
              selectedCommittees.length == 0
            }
            sx={{ marginRight: 2 }}
          >
            {tr("Modify")}
          </Button>

          <Button
            color="info"
            size="medium"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenConfirmDeleteDialogYesNo(true)}
            sx={{ marginRight: 2 }}
          >
            {tr("Delete")}
          </Button>
        </ButtonGroup>

        <ConfirmDialogYesNo
          title={
            tr("Modify") +
            " " +
            tr("existing") +
            " " +
            tr("committee") +
            " " +
            newCommissionName
          }
          contentText={
            tr("Modify") +
            " " +
            tr("existing") +
            " " +
            tr("committee") +
            " " +
            newCommissionName
          }
          open={openConfirmModifyDialogYesNo}
          setOpen={setOpenConfirmModifyDialogYesNo}
          onButtonConfirmClick={onModifyCommissionOnClick}
        />

        <ConfirmDialogYesNo
          title={tr("Delete") + " " + tr("committee") + " " + newCommissionName}
          contentText={
            tr("Delete") + " " + tr("committee") + " " + newCommissionName
          }
          open={openConfirmDeleteDialogYesNo}
          setOpen={setOpenConfirmDeleteDialogYesNo}
          onButtonConfirmClick={onDeleteCommissionOnClick}
        />
      </OverflowBox>

      <OverflowBox
        open={isCreateCommissionOpened}
        setOpen={setIsCreateCommissionOpened}
      >
        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("Name")}:</strong>
        </Typography>

        <TextField
          id="name"
          value={newCommissionName}
          onChange={(event) => setNewCommissionName(event.target.value)}
          error={() => !validateTextNotEmpty(newCommissionName)}
          helperText={
            !validateTextNotEmpty(newCommissionName)
              ? tr("commission") + " " + tr("must not be empty!")
              : ""
          }
          name="name"
          type="name"
          placeholder="Комисия 1"
          autoComplete="name"
          required
          size="small"
        />
        <Divider />

        <Table
          checkboxEnabled={true}
          onRowSelect={(selectedRows) => setSelectedCommittees(selectedRows)}
          selectedRows={selectedCommittees}
          onRowSelectDisable={(param) => param.row.oid != signedCommittee.oid}
          density="comfortable"
          rows={allCommittees}
          columns={committeeColumns}
        />

        <Button
          color="info"
          size="medium"
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenConfirmCreateDialogYesNo(true)}
          disabled={
            !validateTextNotEmpty(newCommissionName) ||
            selectedCommittees.length == 0
          }
          sx={{ marginRight: 2 }}
        >
          {tr("Create")}
        </Button>

        <ConfirmDialogYesNo
          title={
            tr("Create") +
            " " +
            tr("new") +
            " " +
            tr("committee") +
            " " +
            newCommissionName
          }
          contentText={
            tr("Create") +
            " " +
            tr("new") +
            " " +
            tr("committee") +
            " " +
            newCommissionName
          }
          open={openConfirmCreateDialogYesNo}
          setOpen={setOpenConfirmCreateDialogYesNo}
          onButtonConfirmClick={onCreateCommissionOnClick}
        />
      </OverflowBox>
    </Box>
  );
}
