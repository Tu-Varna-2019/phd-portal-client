import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Table from "@/components/main-layout/common/Table";
import { Button, Stack, Typography } from "@mui/material";
import ExamsHook from "../_hooks/ExamsHook";
import Translate from "@/lib/helpers/Translate";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import ExamsConstants from "../_constants/ExamsConstants";

export default function ExamsGrid() {
  const { tr } = Translate();
  const {
    exams,
    openGradeAttachmentOnClick,
    selectedExam,
    setSelectedExam,
    isExamOpened,
    setIsExamOpened,
    isAttachmentBtnClicked,
    uploadAttachment
  } = ExamsHook();
  const { examColumns, committeeColumns } = ExamsConstants();

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

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("report")}:</strong> {selectedExam.report}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("subject")}:</strong> {selectedExam.subject}
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

              {selectedExam.commission != null && (
                <>
                  <Typography
                    component="h3"
                    variant="body1"
                    sx={{ color: "#555" }}
                  >
                    <strong>{tr("Name of the commission")}:</strong>{" "}
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
                    rows={selectedExam.commission.committees}
                    columns={committeeColumns}
                    density="comfortable"
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    loading={isAttachmentBtnClicked}
                    fullWidth
                    startIcon={<DraftsIcon />}
                  >
                    {tr("Upload")}
                    <input
                      type="file"
                      // TODO: Check if it works
                      onChange={(event) => uploadAttachment(event)}
                      hidden
                    />
                  </Button>
                </>
              )}
            </Stack>
          </>
        )}
      </OverflowBox>
    </Box>
  );
}
