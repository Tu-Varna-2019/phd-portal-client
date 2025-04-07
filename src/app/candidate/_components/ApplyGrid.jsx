import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Table from "@/components/main-layout/common/Table";
import Box from "@mui/material/Box";
import AppllyHook from "../_hooks/ApplyHook";
import Milestones from "@/components/main-layout/common/Milestones";
import Translate from "@/lib/helpers/Translate";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import CurriculumForm from "./CurriculumForm";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import CandidateForm from "./CandidateForm";
import CandidateApplyConfirmation from "./CandidateApplyConfirmation";
import { modes } from "@/lib/helpers/utils";
import { useSelector } from "react-redux";
import { selectCandidate } from "@/lib/features/user/slices/userMemoSelector";

export default function ApplyGrid() {
  const {
    activeStep,
    setActiveStep,
    curriculumsByFaculty,
    faculties,
    selectedFaculty,
    setSelectedFaculty,
    selectedCurriculum,
    setSelectedCurriculum,
    titleText,
    disableNextBtn,
    curriculumColumns,
    facultiesColumns
  } = AppllyHook();

  const { tr } = Translate();
  const [isCreatingNewCurriculum, setIsCreatingNewCurriculums] =
    useState(false);
  const [isModifyingExCurriculum, setIsModifyingExCurriculum] = useState(false);
  const candidate = useSelector(selectCandidate);

  const activeStepNames = [
    tr("Choose a faculty"),
    tr("Choose or create a new curriculum"),
    tr("Fill in your candidate details"),
    tr("Verify your details")
  ];

  const RenderGrid = () => {
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
                setSelectedFaculty(tr(faculties[rowIndex].name, "en"))
              }
              rows={faculties}
              columns={facultiesColumns}
              density="comfortable"
            />
          </>
        );
      case 1:
        return (
          <>
            {selectedCurriculum != undefined && (
              <>
                <Typography component="h2" variant="h7" sx={{ mb: 2 }}>
                  {tr("Curriculum") + " " + selectedCurriculum.name}
                </Typography>

                <Typography component="h2" variant="h7" sx={{ mb: 2 }}>
                  {tr("Mode") + " " + tr(selectedCurriculum.mode)}
                </Typography>
              </>
            )}

            <OverflowBox
              open={isCreatingNewCurriculum}
              setOpen={setIsCreatingNewCurriculums}
            >
              <CurriculumForm
                initSelectedCurriculum={""}
                initSelectedMode={modes[0]}
                initSelectedSubjects={[0, 1, 2]}
                btnName={tr("Create")}
                faculty={tr(selectedFaculty, "en")}
              />
            </OverflowBox>

            {selectedCurriculum != undefined && (
              <OverflowBox
                open={isModifyingExCurriculum}
                setOpen={setIsModifyingExCurriculum}
              >
                <CurriculumForm
                  initSelectedCurriculum={selectedCurriculum.name}
                  initSelectedMode={selectedCurriculum.mode}
                  initSelectedSubjects={selectedCurriculum.subjects.map(
                    (subject) => {
                      return subject.id;
                    }
                  )}
                  btnName={tr("Modify")}
                  faculty={tr(selectedFaculty, "en")}
                />
              </OverflowBox>
            )}

            <Table
              rows={curriculumsByFaculty}
              columns={curriculumColumns}
              density="comfortable"
              onRowSelect={(rowIndex) =>
                setSelectedCurriculum(
                  tr(curriculumsByFaculty[rowIndex].name, "en")
                )
              }
            />

            {selectedCurriculum == undefined ? (
              <Button
                color="info"
                size="medium"
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setIsCreatingNewCurriculums(true)}
                sx={{ marginRight: 2 }}
              >
                {tr("Create")}
              </Button>
            ) : (
              selectedCurriculum.subjects != [] && (
                <Button
                  color="info"
                  size="medium"
                  variant="contained"
                  startIcon={<AutoFixNormalIcon />}
                  onClick={() => setIsModifyingExCurriculum(true)}
                  sx={{ marginRight: 2 }}
                >
                  {tr("Modify")}
                </Button>
              )
            )}
          </>
        );

      case 2:
        return <CandidateForm selectedCurriculum={selectedCurriculum} />;

      case 3:
        return <CandidateApplyConfirmation />;
    }
  };

  return (
    <Grid container spacing={4} columns={5}>
      <Milestones
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={
          candidate.name != undefined
            ? activeStepNames.slice(2, 1)
            : activeStepNames
        }
        finishMsg={tr("Your application has been submitted successfully!")}
        nextBtnDisabled={disableNextBtn}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          {tr("Apply for a Phd")}
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
