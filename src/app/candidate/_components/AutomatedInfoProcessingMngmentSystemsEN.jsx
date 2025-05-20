import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Table from "@/components/main-layout/common/Table";
import Box from "@mui/material/Box";
import { Card, Divider } from "@mui/material";
import AutomatedInfoProcessingMngmentSystemsHook from "../_hooks/AutomatedInfoProcessingMngmentSystemsHook";

const simpleSubjectsColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    minWidth: 700
  }
];

export default function AutomatedInfoProcessingMngmentSystemsEN() {
  const { subjects } = AutomatedInfoProcessingMngmentSystemsHook();

  return (
    <Grid container spacing={4} columns={13}>
      <Grid size={{ xs: 12, lg: 9 }}>
        <Box sx={{ width: "100%" }}>
          <Typography component="h5" variant="body1" sx={{ mb: 2 }}>
            <b>
              {" "}
              The Doctoral Program on "Automated Information and Management
              Processing Systems" is aimed at acquiring fundamental and applied
              knowledge in the field.
            </b>
            <br />
            A special emphasis in the doctoral program is separate on the
            upgrading of the knowledge acquired in the Master's Degree. The
            doctoral program creates conditions to acquire specific and, above
            all, theoretical and practical skills. The knowledge that is
            acquired are grouped in four directions: fundamental; special;
            language knowledge; Methods of scientific knowledge. The latter
            include the methods of critical analysis, the ability to develop,
            synthesize and implement scientific and research ideas and
            innovation, to solve complex scientific problems, to expand borders
            and/or supplement knowledge in the relevant scientific field and its
            interactions with border scientific fields.
            <br />
            In addition to specific knowledge, it is also emphasized on the
            acquisition of skills such as: the use of specialized literature
            (including a foreign language); Adaptation of mathematical models to
            different systems; systematization, summary and analysis of existing
            productions; self -conducting scientific and applied research;
            Forming and presenting the results understandable, logical, precise
            and correct.
          </Typography>
        </Box>
        <br />
        <Card>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }} align="center">
            Subjects
          </Typography>
          <Divider />
          <Table
            rows={subjects}
            columns={simpleSubjectsColumns}
            density="comfortable"
          />
        </Card>
      </Grid>
    </Grid>
  );
}
