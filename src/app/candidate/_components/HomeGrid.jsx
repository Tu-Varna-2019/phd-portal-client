import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import HomeHook from "../_hooks/HomeHook";
import { columns, subjectColumns } from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";

export default function HomeGrid() {
  const { curriculums } = HomeHook();
  const { t } = useTranslation("client-page");

  return (
    <Grid container spacing={4} columns={12}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Добре дошли в докторантурската програма на Технически университет Варна
      </Typography>

      <Grid size={{ xs: 12, lg: 9 }}>
        <Typography component="h3" variant="h7" sx={{ mb: 2 }} align="center">
          {t(
            "Curriculum of the Doctoral Programme for the Degree of Doctor of Education and Science"
          )}
        </Typography>
        <Divider />
        <Table rows={curriculums} columns={columns} />
      </Grid>

      {curriculums.forEach((curriculum) => {
        <Grid size={{ xs: 12, lg: 9 }}>
          <Typography component="h3" variant="h7" sx={{ mb: 2 }} align="center">
            {t(curriculum.description)}
          </Typography>
          <Divider />
          <Table
            rows={curriculum.subjects.map((subject) => ({ name: subject }))}
            columns={subjectColumns}
          />
        </Grid>;
      })}
    </Grid>
  );
}
