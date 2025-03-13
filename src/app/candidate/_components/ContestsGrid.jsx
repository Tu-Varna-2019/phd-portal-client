import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import {
  candidatesInReviewColumns,
  contestsColumns
} from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContestsHook from "../_hooks/ContestsHook";
import Translate from "@/lib/helpers/Translate";

export default function ContestsGrid() {
  const {
    contestYears,
    selectedCandidatesByYear,
    setSelectedYearContest,
    candidatesInReview
  } = ContestsHook();
  const [tabState, setTabState] = React.useState(0);

  const handleChange = (_, tabIndexValue) => {
    setTabState(tabIndexValue);
    setSelectedYearContest(contestYears[tabIndexValue]);
  };
  const { tr } = Translate();

  return (
    <Grid container spacing={4} columns={5}>
      <Grid size={{ xs: 12, lg: 9 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          {tr("Announcement of competitions for PhD students")}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Tabs value={tabState} onChange={handleChange} centered>
            {contestYears.map((year, index) => {
              return <Tab key={index} label={year} />;
            })}
          </Tabs>
          <Table
            key={0}
            rows={selectedCandidatesByYear}
            columns={contestsColumns}
            density="comfortable"
          />

          <br />
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            {tr("Doctoral candidates admitted to the examination")}
          </Typography>
          <Table
            key={1}
            rows={candidatesInReview}
            columns={candidatesInReviewColumns}
            density="comfortable"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
