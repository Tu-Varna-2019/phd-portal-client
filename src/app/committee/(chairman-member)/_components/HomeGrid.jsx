import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PieChartDiagram from "@/common/PieChartDiagram";
import HomeHook from "../_hooks/HomeHook";
import Translate from "@/lib/helpers/Translate";

export default function HomeGrid() {
  const { tr } = Translate();
  const { name, candidatesTotal, candidatesPieChart, candidatesPieChartLabel } =
    HomeHook();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {tr("Welcome")} {name}
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <PieChartDiagram
              title={tr("PhD Candidates")}
              chartAvgValue={candidatesTotal}
              pieChartLabels={candidatesPieChartLabel}
              data={candidatesPieChart}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
