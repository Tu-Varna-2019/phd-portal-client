import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PieChartDiagram from "@/common/PieChartDiagram";
import { selectDoctoralCenter } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  candidatesLabelStuct,
  candidatesPieChartStruct
} from "@/components/config/doctoralCenter/manager-expert/dashboard";

const statCardStruct = [
  {
    title: "Събития",
    value: 0,
    interval: "Последните 30 дни",
    trend: "neutral",
    data: []
  }
];

export default function DoctoralCenterHomeGrid() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const [candidatesData, setCandidatesdata] = useState(candidatesLabelStuct);
  const [candidatesChartData, setCandidatesChartData] = useState(
    candidatesPieChartStruct
  );

  // useEffect(() => {
  //   let interval;
  //   const getUsers = async () => {
  //     const authUsers = await fetchAutorizedUsers();
  //     const unauthorizedUsers = await fetchUnauthorizedUsers();
  //
  //     setUsers([].concat(authUsers).concat(unauthorizedUsers));
  //
  //     setUserGroupsData(
  //       assignUserGroupsDataValue(
  //         userGroupsLabelStuct,
  //         authUsers,
  //         unauthorizedUsers
  //       )
  //     );
  //
  //     setUserGroupsChartData(
  //       assignUserGroupsDataValue(
  //         userGroupsPieChartStruct,
  //         authUsers,
  //         unauthorizedUsers
  //       )
  //     );
  //   };

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
              title={"Кандидати докторанти"}
              // chartAvgValue={getSumUsers().toString()}
              pieChartLabels={candidatesChartData}
              data={candidatesData}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
