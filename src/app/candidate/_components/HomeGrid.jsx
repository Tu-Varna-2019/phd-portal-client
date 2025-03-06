import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeHook from "../_hooks/HomeHook";
import { columns } from "../_constants/columnsConstant";
import Table from "@/components/main-layout/common/Table";
import { useTranslation } from "react-i18next";

export default function HomeGrid() {
  const { curriculums } = HomeHook();
  const { t, ready } = useTranslation("client-page");

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Добре дошли в докторантурската програма на Технически университет Варна
        {ready ? t("Hello") : ""}
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, lg: 9 }}>
          <Table rows={curriculums} columns={columns} />
        </Grid>
      </Grid>
    </Box>
  );
}
