import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { curriculumColumns } from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import AppllyHook from "../_hooks/ApplyHook";

export default function ApplyGrid() {
  const { curriculums } = AppllyHook();

  const { t } = useTranslation("client-page");

  // Stepper
  return (
    <Grid container spacing={4} columns={5}>
      <Grid size={{ xs: 12, lg: 9 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          {t("Announcement of competitions for PhD students")}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            {t("Doctoral candidates admitted to the examination")}
          </Typography>
          <Table
            rows={curriculums}
            columns={curriculumColumns}
            density="comfortable"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
