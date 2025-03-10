import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { contestsColumns } from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import ContestsHook from "../_hooks/ContestsHook";

export default function CandidatesInReviewGrid() {
  const { contestYears, selectedCandidatesByYear, setSelectedYearContest } =
    ContestsHook();

  const { t } = useTranslation("client-page");

  return (
    <Grid container spacing={4} columns={5}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {t("Announcement of competitions for PhD students")}
      </Typography>

      <Grid size={{ xs: 12, lg: 9 }}>
        <Box sx={{ width: "100%" }}>
          <Table
            rows={selectedCandidatesByYear}
            columns={contestsColumns}
            density="comfortable"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
