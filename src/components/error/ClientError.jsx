import { Box, Button, Container, Paper, Typography } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import CssBaseline from "@mui/material/CssBaseline";
import Auth from "@/lib/auth/auth";

export default function ClientError() {
  const { handleLogout, handleLogin } = Auth();

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
              Проблем!
            </Typography>

            <Typography variant="body1">
              Сесията ви е изтекла, моля влезте отново
            </Typography>

            <Box sx={{ marginTop: 2 }}>
              <Button
                color="info"
                size="medium"
                variant="contained"
                onClick={handleLogin}
                sx={{ marginRight: 2 }}
              >
                Вход
              </Button>

              <Button
                color="info"
                size="medium"
                variant="contained"
                onClick={handleLogout}
                sx={{ marginRight: 2 }}
              >
                Изход
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </AppTheme>
  );
}
