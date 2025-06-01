import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import { Button, ButtonGroup, Card, Stack, Typography } from "@mui/material";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import APIWrapper from "@/lib/helpers/APIWrapper";
import Translate from "@/lib/helpers/Translate";
import ExamsHook from "../_hooks/ExamsHook";

export default function ExamsGrid() {
  const { tr } = Translate();

  const [selectedExam, setSelectedExam] = useState();
  const [isExamSelected, setIsExamSelected] = useState(false);

  const { exams } = ExamsHook();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Table
        rows={exams}
        // columns={}
        checkboxEnabled
        onRowSelect={(index) => {
          setSelectedCandidate(candidates[index]);
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
                <strong>{tr("name")}:</strong> {selectedExam.name}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("email")}:</strong> {selectedExam.email}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("progress in exam")}:</strong>{" "}
                {selectedExam.exam_step}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("pin")}:</strong> {selectedExam.pin}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Biography")}:</strong>
                <Button
                  onClick={() =>
                    downloadBiography(selectedExam.name, selectedExam.biography)
                  }
                >
                  {selectedExam.biography}
                </Button>
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Country")}:</strong> {selectedExam.country}
              </Typography>
              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("City")}:</strong> {selectedExam.city}
              </Typography>
              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Address")}:</strong> {selectedExam.address}
              </Typography>
              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Post code")}:</strong> {selectedExam.post_code}
              </Typography>
              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Faculty")}:</strong> {selectedExam.faculty}
              </Typography>
              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Curriculum")}:</strong> {selectedExam.curriculum}
              </Typography>
            </Stack>
            <ButtonGroup
              variant="outlined"
              aria-label="Approve/Deny application"
            >
              <Button
                onClick={async () => await processApplication("approved")}
                loading={isActionLoading}
                loadingPosition="start"
              >
                {tr("Approve application")}
              </Button>
              <Button
                onClick={async () => await processApplication("rejected")}
                loading={isActionLoading}
                loadingPosition="start"
              >
                {tr("Deny application")}
              </Button>
            </ButtonGroup>
          </Card>
        </OverflowBox>
      )}
    </Box>
  );
}
