import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PieChartDiagram from "@/common/PieChartDiagram";
import BarChartDashboard from "@/common/BarChartDashboard";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { HomeHook } from "../_hooks/homeHook";

export default function HomeGrid() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const {
    getSumUsers,
    userGroupsData,
    userGroupsChartData,
    selectedYearLog,
    sumOfLogsByYear,
    logsByYear,
    selectedLogPaginationIndex,
    logYearChangeOnClick,
    logYears
  } = HomeHook();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Добре дошли {doctoralCenter.name}
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
              title={"Потребители в системата"}
              chartAvgValue={getSumUsers()}
              pieChartLabels={userGroupsData}
              data={userGroupsChartData}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <BarChartDashboard
            title={`Събития за година ${selectedYearLog}`}
            description={"Времева линия на събитията"}
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
