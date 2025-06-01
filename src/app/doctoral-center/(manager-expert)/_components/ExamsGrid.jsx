import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import { Button, ButtonGroup, Card, Stack, Typography } from "@mui/material";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import ExamsHook from "../_hooks/ExamsHook";
import { useState } from "react";
import CandidateConstants from "../_constants/CandidatesConstants";
import FileAPI from "@/lib/api/file";
import Translate from "@/lib/helpers/Translate";
import { createDataUrl } from "@/lib/helpers/utils";

export default function ExamsGrid() {
  const { tr } = Translate();
  const { exams } = ExamsHook();
  const { download } = FileAPI();
  const { examColumns } = CandidateConstants();

  const [selectedExam, setSelectedExam] = useState();
  const [isExamSelected, setIsExamSelected] = useState(false);
  const [isActionLoading] = useState(false);

  const setCommision = async () => {};

  const openGradeAttachmentOnClick = async (attachment) => {
    const blobData = await download(`grades/${attachment}`);

    const dataUrl = await createDataUrl({
      file: blobData,
      fileType: "blob"
    });
    window.open(dataUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Table
        rows={exams}
        columns={examColumns}
        checkboxEnabled
        onRowSelect={(index) => {
          setSelectedExam(exams[index]);
          setIsExamSelected(true);
        }}
      />
      <AlertBox />

      {isExamSelected && selectedExam != undefined && (
        <OverflowBox open={isExamSelected} setOpen={setIsExamSelected}>
          <Card
            sx={{
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              maxWidth: 400,
              margin: "auto"
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
            >
              {tr("Details")}
            </Typography>

            <Stack direction="column" spacing={2} sx={{ textAlign: "left" }}>
              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("grade")}:</strong> {selectedExam.grade}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("evaluation date")}:</strong>{" "}
                {selectedExam.evalDate}
              </Typography>

              {selectedExam.commision?.name != undefined && (
                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("name of the commision")}:</strong>{" "}
                  {selectedExam.commision.name}
                </Typography>
              )}

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
            </Stack>
            <ButtonGroup variant="outlined" aria-label="Set commision">
              <Button
                onClick={async () => await setCommision()}
                loading={isActionLoading}
                loadingPosition="start"
              >
                {tr("Set commision")}
              </Button>
            </ButtonGroup>
          </Card>
        </OverflowBox>
      )}
    </Box>
  );
}
