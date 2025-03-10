import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import {
  curriculumColumns,
  facultiesColumns
} from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import AppllyHook from "../_hooks/ApplyHook";
import Milestones from "@/components/main-layout/common/Milestones";
import { useCallback, useEffect, useState } from "react";

export default function ApplyGrid() {
  const {
    activeStep,
    setActiveStep,
    curriculumsByFaculty,
    faculties,
    setSelecetedFaculty,
    fetchCurriculumsByFaculty,
    fetchFaculties
  } = AppllyHook();
  const { t } = useTranslation("client-page");

  const RenderGrid = useCallback(() => {
    switch (activeStep) {
      case 0:
        return (
          <Table
            rows={faculties}
            columns={facultiesColumns}
            density="comfortable"
          />
        );
      case 1:
        return (
          <Table
            rows={curriculumsByFaculty}
            columns={curriculumColumns}
            density="comfortable"
          />
        );
      case 2:
        return (
          <Table
            rows={curriculumsByFaculty}
            columns={curriculumColumns}
            density="comfortable"
          />
        );
      case 3:
        return (
          <Table
            rows={curriculumsByFaculty}
            columns={curriculumColumns}
            density="comfortable"
          />
        );
    }
  }, [
    activeStep,
    faculties,
    fetchFaculties,
    curriculumsByFaculty,
    fetchCurriculumsByFaculty
  ]);

  return (
    <Grid container spacing={4} columns={5}>
      <Milestones
        activeStep={activeStep}
        setActiveStep={setActiveStep}
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
          <RenderGrid />
        </Box>
      </Milestones>
    </Grid>
  );
}
