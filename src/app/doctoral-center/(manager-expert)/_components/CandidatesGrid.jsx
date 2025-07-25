import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import CandidateConstants from "../_constants/CandidatesConstants";
import CandidatesHook from "../_hooks/CandidatesHook";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import Translate from "@/lib/helpers/Translate";
import { useState } from "react";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import APIWrapper from "@/lib/helpers/APIWrapper";
import DoctoralCenterAPI from "@/api/DoctoralCenterAPI";

export default function CandidatesGrid() {
  const { candidates } = CandidatesHook();
  const { tr } = Translate();
  const { logNotifyAlert, logAlert } = APIWrapper();
  const { columns, downloadBiography } = CandidateConstants();
  const { review } = DoctoralCenterAPI();

  const [selectedCandidate, setSelectedCandidate] = useState();
  const [isCandidateSelected, setIsCandidateSelected] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const processApplication = async (status) => {
    setIsActionLoading(true);

    if (status == "approved" || status == "rejected") {
      const result = await review(selectedCandidate.email, status);
      if (result.status == "success") {
        logNotifyAlert({
          title: `Кандидат ${selectedCandidate.email} е ${tr(status)}`,
          description: `Кандидат ${selectedCandidate.email} е ${tr(status)}`,
          message: `Кандидат ${selectedCandidate.email} е ${tr(status)}`,
          action: `Кандидат ${selectedCandidate.email} е ${tr(status)}`,
          level: "success",
          scope: "group",
          group: "expert-manager"
        });
      } else {
        logAlert({
          message: tr(result.message),
          description: "Грешка при приемането на изпит",
          action: "Грешка при приемането на изпит",
          level: "error"
        });
      }
    } else {
      console.error(`Status doesn't exist! ${status}`);
      logAlert({
        message: tr("Проблем, моля пробвайте по-късно"),
        description: "Проблем, моля пробвайте по-късно",
        action: "Проблем, моля пробвайте по-късно",
        level: "error"
      });
    }

    setIsActionLoading(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Table
        rows={candidates}
        columns={columns}
        checkboxEnabled
        onRowSelect={(index) => {
          setSelectedCandidate(candidates[index]);
          setIsCandidateSelected(true);
        }}
      />
      <AlertBox />

      {isCandidateSelected && selectedCandidate != undefined && (
        <OverflowBox
          open={isCandidateSelected}
          setOpen={setIsCandidateSelected}
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
              <strong>{tr("name")}:</strong> {selectedCandidate.name}
            </Typography>

            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("email")}:</strong> {selectedCandidate.email}
            </Typography>

            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("Progress in exam")}:</strong>{" "}
              {selectedCandidate.exam_step}
            </Typography>

            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("pin")}:</strong> {selectedCandidate.pin}
            </Typography>

            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("Biography")}:</strong>
              <Button
                onClick={() =>
                  downloadBiography(
                    selectedCandidate.name,
                    selectedCandidate.biography
                  )
                }
              >
                {tr("Click to view")}
              </Button>
            </Typography>

            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("Country")}:</strong> {selectedCandidate.country}
            </Typography>
            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("City")}:</strong> {selectedCandidate.city}
            </Typography>
            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("Address")}:</strong> {selectedCandidate.address}
            </Typography>
            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("Post code")}:</strong> {selectedCandidate.post_code}
            </Typography>
            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("Faculty")}:</strong> {selectedCandidate.faculty}
            </Typography>
            <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
              <strong>{tr("Curriculum")}:</strong>{" "}
              {selectedCandidate.curriculum}
            </Typography>
          </Stack>
          <ButtonGroup
            variant="outlined"
            aria-label="Approve/Deny application"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "background.paper",
              boxShadow: 3
            }}
          >
            <Button
              onClick={async () => await processApplication("approved")}
              variant="contained"
              color="success"
              loading={isActionLoading}
              loadingPosition="start"
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: "bold"
              }}
            >
              ✅ {tr("Approve application")}
            </Button>

            <Button
              onClick={async () => await processApplication("rejected")}
              variant="outlined"
              color="error"
              loading={isActionLoading}
              loadingPosition="start"
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: "bold"
              }}
            >
              ❌ {tr("Deny application")}
            </Button>
          </ButtonGroup>
        </OverflowBox>
      )}
    </Box>
  );
}
