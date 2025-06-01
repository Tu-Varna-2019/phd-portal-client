import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import { Button, ButtonGroup, Card, Stack, Typography } from "@mui/material";
import ExamsHook from "../_hooks/ExamsHook";
import { useState } from "react";
import CandidateConstants from "../_constants/CandidatesConstants";
import FileAPI from "@/lib/api/file";
import Translate from "@/lib/helpers/Translate";
import { createDataUrl } from "@/lib/helpers/utils";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import APIWrapper from "@/lib/helpers/APIWrapper";
import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/lib/features/user/slices/userMemoSelector";

export default function ExamsGrid() {
  const { tr } = Translate();
  const { download } = FileAPI();
  const doctoralCenter = useSelector(selectDoctoralCenter);

  const { setCommissionOnGrade } = DoctoralCenterAPI();
  const { logNotifyAlert } = APIWrapper();

  const { exams, commisions } = ExamsHook();
  const { examColumns, commisionColumns } = CandidateConstants();

  const [selectedExam, setSelectedExam] = useState();
  const [selectedCommission, setSelectedCommision] = useState();

  const [isExamOpened, setIsExamOpened] = useState(false);
  const [isCommisionOpened, setIsCommisionOpened] = useState(false);
  const [isSetCommitteeLoading, setIsSetCommitteeLoading] = useState(false);

  const showCommisionPageOnClick = () => {
    setIsCommisionOpened(true);
  };

  const setCommisionOnClick = async () => {
    setIsSetCommitteeLoading(true);
    const id = selectedExam.id;
    const name = selectedCommission.name;

    const result = await setCommissionOnGrade(id, name);
    if (result != []) {
      logNotifyAlert({
        title: `Член на докторантски център ${doctoralCenter.name} зададе комитет: ${name} към оценка с id: ${id}`,
        description: `Член на докторантски център ${doctoralCenter.name} зададе комитет: ${name} към оценка с id: ${id}`,
        message: `Успешно зададохте комитет: ${name} към оценка с id: ${id}`,
        action: `Член на докторантски център ${doctoralCenter.name} зададе комитет: ${name} към оценка с id: ${id}`,
        level: "success",
        scope: "group",
        group: "expert-manager"
      });
    } else {
      console.error("Error in setting commission to grade: " + id);
      logAlert({
        message: tr("Проблем, моля пробвайте по-късно"),
        description: "Проблем, моля пробвайте по-късно",
        action: "Проблем, моля пробвайте по-късно",
        level: "error"
      });
    }

    setIsSetCommitteeLoading(true);
  };

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
          setIsExamOpened(true);
        }}
      />
      <AlertBox />

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
                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
                  <strong>{tr("grade")}:</strong> {selectedExam.grade}
                </Typography>

                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ color: "#555" }}
                >
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
              <Button
                onClick={() => showCommisionPageOnClick()}
                loadingPosition="start"
              >
                {tr("Set commision")}
              </Button>
            </>
          )}

          {isCommisionOpened && (
            <>
              <Table
                rows={commisions}
                columns={commisionColumns}
                checkboxEnabled
                onRowSelect={(index) => setSelectedCommision(commisions[index])}
                density="comfortable"
              />

              <ButtonGroup variant="outlined" aria-label="Set commision">
                <Button
                  onClick={async () => await setCommisionOnClick()}
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
