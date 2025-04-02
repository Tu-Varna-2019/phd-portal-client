import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import HomeHook from "../_hooks/HomeHook";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CandidateColumnConstants from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Card, Divider, List, ListItem } from "@mui/material";
import CollapseMenu from "@/components/main-layout/common/CollapseMenu";
import { TabContext, TabPanel } from "@mui/lab";
import Translate from "@/lib/helpers/Translate";

export default function HomeGridEN() {
  const { curriculums } = HomeHook();
  const [value, setValue] = React.useState(0);
  const { tr } = Translate();
  const { curriculumColumns } = CandidateColumnConstants();

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={4} columns={13}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Welcome to the Doctoral Program of Varna Technical University
      </Typography>

      <Grid size={{ xs: 12, lg: 9 }}>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="How is a doctor's scientific degree?" />
            <Tab label="What can doctors benefit from?" />
          </Tabs>

          <TabContext value={0}>
            <TabPanel value={value}>
              <Typography component="h6" variant="body1" sx={{ mb: 2 }}>
                <b>
                  {" "}
                  The Doctor's Education and Scientific Degree is acquired after
                  Successfully protected scientific work - dissertation.
                </b>
                <br />
                Preparation is done through a doctoral studies under the
                scientific Guide to leading specialists in the scientific field.
                <br />
                The dissertation is defended in front of a scientific jury
                consisting by well-known scientists and must contain essential
                scientific and applied and applied contributions.
                <br />
                Depending on the scientific field during Doctoral student
                performs the specific research A work laid down in his
                individual plan is preparing theoretically in the areas included
                in the same plan, it appears on PhD exams and develops his
                dissertation work.
              </Typography>
            </TabPanel>
          </TabContext>

          <TabContext value={1}>
            <TabPanel value={value}>
              <Typography component="h6" variant="body1" sx={{ mb: 2 }}>
                <b> PhD students can benefit from: </b>
              </Typography>
              <List sx={{ listStyleType: "disc" }}>
                <ListItem sx={{ display: "list-item" }}>
                  the modern base of the university - laboratories and hostels;
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  State scholarship in regular form of training;
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  access to the largest technical library in northeast Bulgaria;
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  participation in national, international and regional
                  competitions for projects;
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  Various mobile in international and/or national programs and
                  projects by conducting research work or training in foreign or
                  our universities or research centers in accordance with the
                  doctoral A program that is trained and more.
                </ListItem>
              </List>
            </TabPanel>
          </TabContext>
        </Box>
        <Typography component="h6" variant="body1" sx={{ mb: 2 }}>
          <b>Doctoral studies</b>
          is a major form of organized preparation of highly qualified
          scientific, research and teaching staff with experience in
          experimental activity in the field of various професионални
          направления.
        </Typography>
        <Alert severity="info" variant="filled">
          <AlertTitle>Remark</AlertTitle>
          Persons who have completed educational
          <b>“masters”</b>.
          <br />
          Doctoral student is conducted in
          <b>
            {" "}
            regular, part -time education and doctoral studies of a standalone
            Preparation.
          </b>
        </Alert>
        <CollapseMenu
          title="The order and conditions of admission to a doctorate,"
          body="Doctoral studies as well as conducting the public
 Protection is in compliance with the Higher Education Act, the Law on
 the development of the academic staff in the Republic of Bulgaria, the Rules
 for the implementation of the Law on the Development of Academic Company in
 Republic of Bulgaria, decrees of the Council of Ministers, Rules
 for admission, training of doctoral students and acquisition of
 Doctor's educational and scientific degree and the Doctor's Scientific Degree
 of the Sciences ”at the Technical University - Varna and solutions of
 The Academic Council."
        />

        <br />
        <Card>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }} align="center">
            {tr(
              "Curriculum of the Doctoral Programme for the Degree of Doctor of Education and Science"
            )}
          </Typography>
          <Divider />
          <Table
            rows={curriculums}
            columns={curriculumColumns}
            density="comfortable"
          />
        </Card>
      </Grid>
    </Grid>
  );
}
