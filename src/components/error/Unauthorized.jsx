import { Box, Button, Container, Paper, Typography } from "@mui/material";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import AppTheme from "../shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Auth from "@/lib/auth/auth";

export default function Unauthorized() {
  const { handleLogout } = Auth();

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
              <NoAccountsIcon color="lightskyblue" sx={{ fontSize: 60 }} />
            </Box>

            <Typography variant="h4" color="info" gutterBottom>
              401 - Неоторизиран
            </Typography>

            <Typography variant="body1">
              Вие нямате права да достъпите тази страница. Моля свържете се с
              администратора за достъп.
            </Typography>
            <Box sx={{ marginTop: 2 }}>
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
