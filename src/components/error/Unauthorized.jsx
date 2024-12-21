import { Box, Container, Paper, Typography } from "@mui/material";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import AppTheme from "../shared-theme/AppTheme";

import CssBaseline from "@mui/material/CssBaseline";

export default function Unauthorized() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: "auto",
          display: "flex"
        })}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            minHeight: "100vh",
            textAlign: "center",
            paddingTop: 5,
            alignItems: "center",
            justifyContent: "justify"
          }}
        >
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Box>
              <MicrosoftIcon color="lightskyblue" sx={{ fontSize: 60 }} />
            </Box>

            <Typography variant="h4" color="info" gutterBottom>
              401 - Неоторизиран
            </Typography>

            <Typography variant="body1">
              Вие нямате права да достъпите тази страница. Моля свържете се с
              администратора за достъп.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </AppTheme>
  );
}
