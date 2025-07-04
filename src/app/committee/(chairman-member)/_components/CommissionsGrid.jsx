import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import { Button, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Translate from "@/lib/helpers/Translate";
import EditIcon from "@mui/icons-material/Edit";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import CommissionsHook from "../_hooks/CommissionsHook";
import CommissionsConstants from "../_constants/commissionsConstants";

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
    // newCommissionName,
    // setNewCommissionName,
    // onCreateCommissionOnClick,
    // onModifyCommissionOnClick,
    isCommissionOpened,
    setIsCommissionOpened
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
        Test
      </OverflowBox>
      <OverflowBox
        open={isCreateCommissionOpened}
        setOpen={setIsCreateCommissionOpened}
      >
        Test
      </OverflowBox>
    </Box>
  );
}
