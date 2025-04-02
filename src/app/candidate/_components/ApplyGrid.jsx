import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import {
  curriculumColumns,
  facultiesColumns
} from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import Box from "@mui/material/Box";
import AppllyHook from "../_hooks/ApplyHook";
import Milestones from "@/components/main-layout/common/Milestones";
import { useCallback } from "react";
import Translate from "@/lib/helpers/Translate";

export default function ApplyGrid() {
  const {
    activeStep,
    setActiveStep,
    curriculumsByFaculty,
    faculties,
    form,
    selectedFaculty,
    setSelectedFaculty,
    titleText,
    disableNextBtn
  } = AppllyHook();
  const { tr } = Translate();

  const RenderGrid = useCallback(() => {
    switch (activeStep) {
      case 0:
        return (
          <>
            {selectedFaculty !== "" && (
              <Typography component="h2" variant="h7" sx={{ mb: 2 }}>
                {selectedFaculty}
              </Typography>
            )}
            <Table
              onRowSelect={(rowIndex) =>
                setSelectedFaculty(faculties[rowIndex].name)
              }
              rows={faculties}
              columns={facultiesColumns}
              density="comfortable"
            />
          </>
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
  }, [activeStep, faculties, curriculumsByFaculty, selectedFaculty]);

  return (
    <Grid container spacing={4} columns={5}>
      <Milestones
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={[
          tr("Choose a faculty"),
          tr("Choose a study programme"),
          tr("Select disciplines"),
          tr("Fill in your details")
        ]}
        finishMsg={tr("Your application has been submitted successfully")}
        nextBtnDisabled={disableNextBtn}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          {tr("Apply for a PhD")}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            {titleText}
          </Typography>
          <RenderGrid />
        </Box>
      </Milestones>
    </Grid>
  );
}
