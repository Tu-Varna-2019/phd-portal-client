import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { contestsColumns } from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import { useTranslation } from "react-i18next";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContestsHook from "../_hooks/ContestsHook";

export default function ContestsGrid() {
  const { contestYears, selectedCandidatesByYear, setSelectedYearContest } =
    ContestsHook();
  const [tabState, setTabState] = React.useState(0);

  const handleChange = (_, tabIndexValue) => {
    setTabState(tabIndexValue);
    setSelectedYearContest(contestYears[tabIndexValue]);
  };
  const { t } = useTranslation("client-page");

  return (
    <Grid container spacing={4} columns={5}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {t("Announcement of competitions for PhD students")}
      </Typography>

      <Grid size={{ xs: 12, lg: 9 }}>
        <Box sx={{ width: "100%" }}>
          <Tabs value={tabState} onChange={handleChange} centered>
            {contestYears.map((year, index) => {
              return <Tab key={index} label={year} />;
            })}
          </Tabs>
          <Table
            rows={selectedCandidatesByYear}
            columns={contestsColumns}
            density="comfortable"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
