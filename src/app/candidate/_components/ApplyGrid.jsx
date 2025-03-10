import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { curriculumColumns } from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import AppllyHook from "../_hooks/ApplyHook";
import Milestones from "@/components/main-layout/common/Milestones";

export default function ApplyGrid() {
  const { curriculums, faculties, form } = AppllyHook();
  const { t } = useTranslation("client-page");

  return (
    <Grid container spacing={4} columns={5}>
      <Milestones
        steps={[
          t("Choose a faculty"),
          t("Choose a study programme"),
          t("Select disciplines"),
          t("Fill in your details")
        ]}
        finishMsg={t("Your application has been submitted successfully")}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          {t("Apply for a PhD")}
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
      </Milestones>
    </Grid>
  );
}
