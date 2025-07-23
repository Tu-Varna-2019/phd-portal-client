import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import ExamsHook from "../_hooks/ExamsHook";
import CandidateConstants from "../_constants/CandidatesConstants";
import Translate from "@/lib/helpers/Translate";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import ConfirmDialogMultiChoices from "@/components/dialog-box/ConfirmDialogMultiChoices";

export default function ExamsGrid() {
  const { tr } = Translate();
  const {
    exams,
    commissions,
    openGradeAttachmentOnClick,
    setCommissionOnClick,
    onApproveCandidatePhdClick,
    onRejectCandidatePhdClick,
    selectedExam,
    setSelectedExam,
    selectedCommission,
    isExamOpened,
    setIsExamOpened,
    isCommissionOpened,
    isModifyCommissionOpened,
    showModifyCommissionPageOnClick,
    isSetCommitteeLoading,
    setIsCommissionOpened,
    setIsModifyCommissionOpened,
    setSelectedCommission,
    showCommissionPageOnClick,
    setModifyCommissionOnClick
  } = ExamsHook();
  const { examColumns, commissionColumns } = CandidateConstants();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Table
        rows={exams}
        columns={examColumns}
        checkboxEnabled
        onRowSelect={(index) => {
          if (exams[index] != undefined) setSelectedExam(exams[index]);
          setIsExamOpened(true);
        }}
      />
      <AlertBox />

      <ConfirmDialogMultiChoices
        title={tr("Approve or refuse the applicant/doctoral student")}
        description={tr("Approve or refuse the applicant/doctoral student")}
        buttonNames={[tr("approve"), tr("reject")]}
        onButtonsConfirmClick={[
          onApproveCandidatePhdClick,
          onRejectCandidatePhdClick
        ]}
      />

      <OverflowBox open={isExamOpened} setOpen={setIsExamOpened}>
        {isExamOpened && (
          <>
            <Typography
              component="h2"
              variant="h6"
              sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
            >
              {tr("Details")}
            </Typography>

            <Stack direction="column" spacing={2} sx={{ textAlign: "left" }}>
              {selectedExam.grade != undefined && (
                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("grade")}:</strong> {selectedExam.grade}
                </Typography>
              )}

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("evaluation date")}:</strong>{" "}
                {selectedExam.evalDate}
              </Typography>

              {selectedExam.commission?.name != undefined && (
                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("Name of the commission")}:</strong>{" "}
                  {selectedExam.commission.name}
                </Typography>
              )}

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Report")}:</strong> {selectedExam.report}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Subject")}:</strong> {selectedExam.subject}
              </Typography>

              <Typography component="h1" variant="body2" sx={{ color: "#555" }}>
                <strong>{tr("Evaluated person")}</strong>
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("name")}:</strong> {selectedExam.evaluatedUser.name}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("email")}:</strong>{" "}
                {selectedExam.evaluatedUser.email}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Type")}:</strong>{" "}
                {tr(selectedExam.evaluatedUser.group)}
              </Typography>

              {selectedExam.attachments != undefined && (
                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("attachments")}:</strong>
                  {selectedExam.attachments.map((attachment, index) => {
                    return (
                      <Button
                        key={index}
                        onClick={() => openGradeAttachmentOnClick(attachment)}
                      >
                        {tr("file") + " " + (index + 1)}
                      </Button>
                    );
                  })}
                </Typography>
              )}
            </Stack>
            {selectedExam.commission == null && (
              <Button
                onClick={() => showCommissionPageOnClick()}
                loadingPosition="start"
              >
                {tr("Set commission")}
              </Button>
            )}
            {selectedExam.commission != undefined && (
              <Button
                onClick={() => showModifyCommissionPageOnClick()}
                loadingPosition="start"
              >
                {tr("Modify commission")}
              </Button>
            )}
          </>
        )}
      </OverflowBox>

      <OverflowBox open={isCommissionOpened} setOpen={setIsCommissionOpened}>
        <>
          <Table
            rows={commissions}
            columns={commissionColumns}
            checkboxEnabled
            onRowSelect={(index) => setSelectedCommission(commissions[index])}
            density="comfortable"
          />

          <ButtonGroup variant="outlined" aria-label="Set commission">
            <Button
              onClick={async () => await setCommissionOnClick()}
              loadingPosition="start"
              disabled={selectedCommission == null}
              loading={isSetCommitteeLoading}
            >
              {tr("Confirm")}
            </Button>
            <Button
              onClick={() => {
                setIsExamOpened(true);
                setIsCommissionOpened(false);
              }}
              loadingPosition="start"
            >
              {tr("Back")}
            </Button>
          </ButtonGroup>
        </>
      </OverflowBox>

      <OverflowBox
        open={isModifyCommissionOpened}
        setOpen={setIsModifyCommissionOpened}
      >
        <>
          <Table
            rows={commissions}
            columns={commissionColumns}
            checkboxEnabled
            onRowSelect={(index) => setSelectedCommission(commissions[index])}
            density="comfortable"
          />

          <ButtonGroup variant="outlined" aria-label="Set commission">
            <Button
              onClick={async () => await setModifyCommissionOnClick()}
              loadingPosition="start"
              disabled={selectedCommission == null}
              loading={isSetCommitteeLoading}
            >
              {tr("Confirm")}
            </Button>
            <Button
              onClick={() => {
                setIsExamOpened(true);
                setIsModifyCommissionOpened(false);
              }}
              loadingPosition="start"
            >
              {tr("Back")}
            </Button>
          </ButtonGroup>
        </>
      </OverflowBox>
    </Box>
  );
}
