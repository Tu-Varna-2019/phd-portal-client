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
import CandidateAPI from "@/lib/api/candidate";
import CandidateColumnConstants from "../_constants/columnsConstant";
import { Paper } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

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

export default function CreateCurriculumForm({ faculty }) {
  const { tr, language } = Translate();
  const [curriculumName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const curriculumNameError = curriculumName == "" || curriculumName.length < 0;
  const { subjectsColumns } = CandidateColumnConstants();

  const { getSubjectsByFacultyName } = CandidateAPI();

  const removeMandatorySubjects = (subjectsArg) => {
    const mandatorySubjects = [
      "English",
      "Methods of Research and Development of dissertation",
      "Block C (PhD minimum)"
    ];

    const subjectFitered = subjectsArg.filter(
      (subject) => !mandatorySubjects.includes(tr(subject.name, "en"))
    );

    return subjectFitered;
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsRes = await getSubjectsByFacultyName(faculty);

      subjectsRes.forEach((subject, index) => {
        subject.id = index;
        subject.name = tr(subject.name);
      });

      setSubjects(removeMandatorySubjects(subjectsRes));
    };

    fetchSubjects();
  }, [language]);

  const handleCreateCurriculum = () => {
    console.log(`You created dem curriculums!`);
  };

  return (
    <StyleContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <CreateIcon />
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
              name={tr("Name of the curriculum")}
              required
              fullWidth
              id="name"
              error={curriculumNameError}
              helperText={tr("Curriculum name is incorrect!")}
              color={curriculumNameError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">{tr("Subjects")}</FormLabel>
            <Paper
              variant="outlined"
              sx={{ maxHeight: 300, overflowY: "auto", mt: 1 }}
            >
              <Table
                checkboxEnabled
                onRowSelect={(rowIndex) =>
                  setSubjects(tr(subjects[rowIndex].name, "en"))
                }
                rows={subjects}
                columns={subjectsColumns}
                density="compact"
              />
            </Paper>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={curriculumNameError || subjects == []}
            onClick={() => console.log("Click!")}
          >
            {tr("Create")}
          </Button>
        </Box>
      </Card>
    </StyleContainer>
  );
}
