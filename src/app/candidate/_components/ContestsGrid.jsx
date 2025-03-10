import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { contestsColumns } from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import { useTranslation } from "react-i18next";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel } from "@mui/lab";
import ContestsHook from "../_hooks/ContestsHook";

export default function ContestsGrid() {
  const { contestYears, contestCandidatesByYear } = ContestsHook();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { t } = useTranslation("client-page");

  return (
    <Grid container spacing={4} columns={13}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {t("Announcement of competitions for PhD students")}
      </Typography>

      <Grid size={{ xs: 12, lg: 9 }}>
        <Box sx={{ width: "100%" }}>
          {contestYears.map((year, index) => {
            return (
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label={year} />
              </Tabs>
            );
          })}

          <TabContext value={0}>
            <TabPanel value={value}>
              <Table
                rows={contestCandidatesByYear}
                columns={contestsColumns}
                density="comfortable"
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
}
