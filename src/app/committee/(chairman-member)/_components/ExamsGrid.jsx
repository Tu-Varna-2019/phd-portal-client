import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import { Button, ButtonGroup, Card, Stack, Typography } from "@mui/material";
import ExamsHook from "../_hooks/ExamsHook";
import CandidateConstants from "../_constants/CandidateConstants";
import Translate from "@/lib/helpers/Translate";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import ConfirmDialogMultiChoices from "@/components/dialog-box/ConfirmDialogMultiChoices";

export default function ExamsGrid() {
  const { tr } = Translate();
  const {
    exams,
    commisions,
    committees,
    openGradeAttachmentOnClick,
    selectedExam,
    setSelectedExam,
    selectedCommission,
    isExamOpened,
    setIsExamOpened,
    isCommisionOpened,
    isSetCommitteeLoading,
    setIsCommisionOpened,
    setSelectedCommission,
    showCommisionPageOnClick
  } = ExamsHook();
  const { examColumns, committeeColumns } = CandidateConstants();

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
          () => console.log("approve"),
          () => console.log("approve")
        ]}
      />

      <OverflowBox open={isExamOpened} setOpen={setIsExamOpened}>
        <Card
          sx={{
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 400,
            margin: "auto"
          }}
        >
          {isExamOpened && !isCommisionOpened && (
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

                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("evaluation date")}:</strong>{" "}
                  {selectedExam.evalDate}
                </Typography>

                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("Name of the commision")}:</strong>{" "}
                  {selectedExam.commission.name}
                </Typography>

                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("Committees")}:</strong>{" "}
                </Typography>

                <Table
                  rows={committees}
                  columns={committeeColumns}
                  density="comfortable"
                />

                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("report")}:</strong> {selectedExam.report}
                </Typography>

                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("subject")}:</strong> {selectedExam.subject}
                </Typography>

                <Typography
                  component="h1"
                  variant="body2"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("Evaluated person")}</strong>
                </Typography>

                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("name")}:</strong>{" "}
                  {selectedExam.evaluatedUser.name}
                </Typography>

                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("email")}:</strong>{" "}
                  {selectedExam.evaluatedUser.email}
                </Typography>

                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("Type")}:</strong>{" "}
                  {selectedExam.evaluatedUser.group}
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
              {selectedExam.commission == undefined && (
                <Button
                  onClick={() => showCommisionPageOnClick()}
                  loadingPosition="start"
                >
                  {tr("Evaluate")}
                </Button>
              )}

              {selectedExam.grade != undefined && (
                <Button
                  onClick={() => showCommisionPageOnClick()}
                  loadingPosition="start"
                >
                  {tr("Approve/Reject")}
                </Button>
              )}
            </>
          )}

          {isCommisionOpened && (
            <>
              <Table
                rows={commisions}
                columns={commisionColumns}
                checkboxEnabled
                onRowSelect={(index) =>
                  setSelectedCommission(commisions[index])
                }
                density="comfortable"
              />

              <ButtonGroup variant="outlined" aria-label="Set commision">
                <Button
                  onClick={() => console.log("click")}
                  loadingPosition="start"
                  disabled={selectedCommission == null}
                  loading={isSetCommitteeLoading}
                >
                  {tr("Confirm")}
                </Button>
                <Button
                  onClick={() => {
                    setIsExamOpened(true);
                    setIsCommisionOpened(false);
                  }}
                  loadingPosition="start"
                >
                  {tr("Back")}
                </Button>
              </ButtonGroup>
            </>
          )}
        </Card>
      </OverflowBox>
    </Box>
  );
}
