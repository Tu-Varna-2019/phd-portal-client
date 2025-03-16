import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PieChartDiagram from "@/common/PieChartDiagram";
import BarChartDashboard from "@/common/BarChartDashboard";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { LogsHook, UserHook } from "../_hooks/HomeHook";
import Translate from "@/lib/helpers/Translate";

export default function HomeGrid() {
  const { tr } = Translate();
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const {
    selectedYearLog,
    sumOfLogsByYear,
    logsByYear,
    selectedLogPaginationIndex,
    logYearChangeOnClick,
    logYears
  } = LogsHook();

  const { getSumUsers, userGroupsData, userGroupsChartData } = UserHook();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {tr("Welcome")} {doctoralCenter.name}
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
              title={tr("Users into the system")}
              chartAvgValue={getSumUsers()}
              pieChartLabels={userGroupsData}
              data={userGroupsChartData}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <BarChartDashboard
            title={tr("Events for year") + " " + selectedYearLog}
            description={tr("Timeline for the events")}
            avgValue={sumOfLogsByYear}
            logsBarChartSeries={logsByYear}
          />
          <Pagination
            page={selectedLogPaginationIndex}
            color="primary"
            count={logYears.length}
            onChange={logYearChangeOnClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
