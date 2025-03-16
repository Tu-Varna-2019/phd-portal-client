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

export default function HomeGrid() {
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
        Добре дошли в докторантурската програма на Технически университет Варна
      </Typography>

      <Grid size={{ xs: 12, lg: 9 }}>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Как се придобива научна степен 'доктор' ?" />
            <Tab label="От какво могат да се възползват докторантите ?" />
          </Tabs>

          <TabContext value={0}>
            <TabPanel value={value}>
              <Typography component="h6" variant="body1" sx={{ mb: 2 }}>
                <b>
                  {" "}
                  Образователна и научна степен "доктор" се придобива след
                  успешно защитен научен труд - дисертация.
                </b>
                <br />
                Подготовката става чрез обучение в докторантура, под научното
                ръководство на водещи специалисти в научната област.
                <br />
                Дисертационният труд се защитава пред Научно жури, състоящо се
                от известни учени и трябва да съдържа съществени научно-приложни
                и приложни приноси.
                <br /> В зависимост от научната област по време на
                докторантурата докторантът извършва специфичната изследователска
                работа, заложена в неговия индивидуален план, подготвя се
                теоретично в областите, включени в същия план, явява се на
                докторантски изпити и разработва дисертационния си труд.
              </Typography>
            </TabPanel>
          </TabContext>

          <TabContext value={1}>
            <TabPanel value={value}>
              <Typography component="h6" variant="body1" sx={{ mb: 2 }}>
                <b> Докторантите могат да се възползват от: </b>
              </Typography>
              <List sx={{ listStyleType: "disc" }}>
                <ListItem sx={{ display: "list-item" }}>
                  съвременната база на университета – лаборатории и общежитие;
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  държавна стипендия при редовна форма на обучение;
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  достъп до най-голямата техническа библиотека в Североизточна
                  България;
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  участие в национални, международни и регионални конкурси за
                  проекти;
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  различни мобилности по международни и/или национални програми
                  и проекти като провеждат научно-изследователска работа или
                  обучение в чужди или наши университети или
                  научно­изследователски центрове, в съответствие с докторската
                  програма, по която се обучават и др.
                </ListItem>
              </List>
            </TabPanel>
          </TabContext>
        </Box>
        <Typography component="h6" variant="body1" sx={{ mb: 2 }}>
          <b>Докторантурата</b> е основна форма за организирана подготовка на
          висококвалифицирани научни, изследователски и преподавателски кадри с
          опит в експерименталната дейност в областта на различните
          професионални направления.
        </Typography>
        <Alert severity="info" variant="filled">
          <AlertTitle>Забележка</AlertTitle>
          За докторантура могат да кандидатстват лица, завършили
          образователно-квалификационна степен <b>“магистър”</b>.
          <br />
          Докторантуратасе провежда в
          <b>
            {" "}
            редовна, задочна форма на обучение и докторантура на самостоятелна
            подготовка.
          </b>
        </Alert>
        <CollapseMenu
          title="Редът и условията за приемане в докторантура,"
          body="
              Обучението на докторантите, както и провеждането на публичната
              защита е съобразено със Закона за висше образование, Закона за
              развитието на академичния състав в Република България, Правилника
              за прилагане на закона за развитието на академичния състав в
              Република България, Постановления на Министерския съвет, Правилник
              за приемане, обучение на докторанти и придобиване на
              образователната и научна степен „доктор” и научната степен „доктор
              на науките” в Технически университет – Варна и решения на
              Академическия съвет.
          "
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
