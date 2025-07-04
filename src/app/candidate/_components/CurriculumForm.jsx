import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Translate from "@/lib/helpers/Translate";
import { useEffect, useState } from "react";
import Table from "@/components/main-layout/common/Table";
import CandidateAPI from "@/api/CandidateAPI";
import { MenuItem, Paper, Select } from "@mui/material";
import Alert from "@mui/material/Alert";
import SubjectColumns from "../_constants/subjectColumns";
import { modes } from "@/lib/helpers/utils";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px"
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px"
  })
}));
const StyleContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4)
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))"
    })
  }
}));

export default function CurriculumForm({
  btnName,
  faculty,
  initSelectedSubjects,
  initSelectedMode,
  initSelectedCurriculum
}) {
  const { getSubjectsByFacultyName } = CandidateAPI();
  const { tr, language } = Translate();
  const [curriculumName, setCurriculumName] = useState(initSelectedCurriculum);
  const [mode, setModes] = useState(initSelectedMode);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] =
    useState(initSelectedSubjects);
  const [alertErrorMsg, setAlertErrorMsg] = useState("");

  const curriculumNameError = curriculumName == "" || curriculumName.length < 0;
  const submitBtnError = curriculumNameError || selectedSubjects.length == 7;

  const { subjectsColumns } = SubjectColumns({
    selectedRows: selectedSubjects,
    setSelectedRows: setSelectedSubjects
  });

  useEffect(() => {
    if (curriculumNameError) {
      setAlertErrorMsg(tr("Curriculum name is empty!"));
    } else if (selectedSubjects.length == 7) {
      setAlertErrorMsg(tr("You have reached 6 maximum subjects to select!"));
    } else {
      setAlertErrorMsg("");
    }
  }, [curriculumName, selectedSubjects]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsRes = await getSubjectsByFacultyName(faculty);
      subjectsRes.forEach((subject, index) => {
        subject.id = index;
        subject.name = tr(subject.name);
      });
      setSubjects(subjectsRes);
    };
    fetchSubjects();
  }, [language]);

  const handleCreateCurriculum = () => {
    const subjectEN = subjects
      .filter((subject) => selectedSubjects.includes(subject.id))
      .map((subject) => {
        subject.name = tr(subject.name, "en");
        return subject;
      });

    localStorage.setItem(
      "curriculum",
      JSON.stringify({
        name: curriculumName,
        mode: mode,
        subjects: subjectEN
      })
    );
  };

  return (
    <StyleContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          {tr("Create a new curriculum")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleCreateCurriculum}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="name">{tr("Name")}</FormLabel>
            <TextField
              autoComplete="name"
              value={curriculumName}
              name={tr("Name of the curriculum")}
              onChange={(event) => setCurriculumName(event.target.value)}
              required
              fullWidth
              id="name"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mode">{tr("Mode")}</FormLabel>
            <Select
              id="select-box"
              onChange={(event) => setModes(event.target.value)}
              defaultValue={initSelectedMode}
              sx={{ width: 300 }}
            >
              {modes.map((mode, index) => {
                return (
                  <MenuItem key={index} value={mode}>
                    {tr(mode)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">{tr("Subjects")}</FormLabel>
            <Paper
              variant="outlined"
              sx={{ maxHeight: 300, overflowY: "auto", mt: 1 }}
            >
              <Table
                rows={subjects}
                columns={subjectsColumns}
                density="compact"
              />
            </Paper>
          </FormControl>
          {submitBtnError && (
            <Alert variant="filled" severity="error">
              {tr(alertErrorMsg)}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={submitBtnError}
            onClick={handleCreateCurriculum}
          >
            {btnName}
          </Button>
        </Box>
      </Card>
    </StyleContainer>
  );
}
