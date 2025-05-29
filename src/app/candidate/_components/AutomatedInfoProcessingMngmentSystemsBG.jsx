import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Table from "@/components/main-layout/common/Table";
import Box from "@mui/material/Box";
import { Card, Divider } from "@mui/material";
import AutomatedInfoProcessingMngmentSystemsHook from "../_hooks/AutomatedInfoProcessingMngmentSystemsHook";

const simpleSubjectsColumns = [
  {
    field: "name",
    headerName: "Име",
    flex: 1.5,
    minWidth: 700
  }
];

export default function AutomatedInfoProcessingMngmentSystemsBG() {
  const { subjects } = AutomatedInfoProcessingMngmentSystemsHook();

  return (
    <Grid container spacing={4} columns={13}>
      <Grid size={{ xs: 12, lg: 9 }}>
        <Box sx={{ width: "100%" }}>
          <Typography component="h5" variant="body1" sx={{ mb: 2 }}>
            <b>
              {" "}
              Докторската програма по "Aвтоматизирани системи за обработка на
              информация и управление" е насочена към придобиване на
              фундаментални и приложни знания в областта.
            </b>
            <br />
            Специален акцент в докторската програма е отделен върху надграждане
            на знанията, получени в ОКС „магистър”. Докторската програма създава
            условия да се придобият специфични и най-вече теоретико-практически
            умения. Знанията, които се придобиват, са групирани в четири
            направления: фундаментални; специални; езикови знания; методи на
            научното познание. Към последните се отнасят методите за критичен
            анализ, способностите да разработват, синтезират и прилагат научни и
            изследователски идеи и иновации, да решават комплексни научни
            проблеми, да разширяващи границите и/или допълват знанията в
            съответната научната област и нейните взаимодействия с гранични
            научни области.
            <br />
            Освен специфични знания, акцентира се и върху придобиване на умения
            като: използване на специализирана литература (в това число и на
            чужд език); адаптиране на математически модели в различни системи;
            систематизиране, обобщаване и анализиране на съществуващи
            постановки; самостоятелно провеждане на научни и приложни
            изследвания; оформяне и представяне на резултатите разбираемо,
            логично, прецизно и коректно.
          </Typography>
        </Box>
        <br />
        <Card>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }} align="center">
            Дисциплини
          </Typography>
          <Divider />
          <Table
            rows={subjects}
            columns={simpleSubjectsColumns}
            density="comfortable"
          />
        </Card>
      </Grid>
    </Grid>
  );
}
