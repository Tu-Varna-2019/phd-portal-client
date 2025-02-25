import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PieChartDiagram from "@/common/PieChartDiagram";
import { selectDoctoralCenter } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  candidatesLabelStuct,
  candidatesPieChartStruct
} from "@/components/config/doctoralCenter/manager-expert/dashboard";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import { runPeriodically } from "@/lib/helpers/utils";

export default function DoctoralCenterHomeGrid() {
  const doctoralCenter = useSelector(selectDoctoralCenter);

  const [candidatesPieChartLabel, setCandidatesPieChartLabel] =
    useState(candidatesLabelStuct);
  const [candidatesTotal, setCandidatesTotal] = useState(0);
  const [candidatesPieChart, setCandidatesPieChart] = useState(
    candidatesPieChartStruct
  );
  const { getCandidates } = DoctoralCenterAPI();

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidates = await getCandidates();

      setCandidatesTotal(candidates.length);
      setCandidatesPieChartLabel(
        setPieChartCandidates(candidates, candidatesLabelStuct, "name")
      );
      setCandidatesPieChart(
        setPieChartCandidates(candidates, candidatesPieChartStruct, "label")
      );
    };

    fetchCandidates();
    runPeriodically(() => {
      fetchCandidates();
    });
  }, [setCandidatesTotal, setCandidatesPieChartLabel, setCandidatesPieChart]);

  const setPieChartCandidates = (
    candidates,
    candidatesStruct,
    pieChartKeyName
  ) => {
    const candidateStatusesLangMapping = {
      Чакащи: "waiting",
      Приети: "accepted",
      Отказани: "rejected"
    };

    Object.entries(candidatesStruct).map(([_, value], index) => {
      candidatesStruct[index].value = candidates.reduce(
        (prev, currentValue) => {
          if (
            currentValue.status ==
            candidateStatusesLangMapping[value[pieChartKeyName]]
          )
            prev++;
          return prev;
        },
        0
      );
    });
    return candidatesStruct;
  };

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
