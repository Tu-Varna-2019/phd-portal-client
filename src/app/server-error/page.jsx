"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import GppBadIcon from "@mui/icons-material/GppBad";
import CssBaseline from "@mui/material/CssBaseline";
import Auth from "@/lib/auth/auth";
import AppTheme from "@/components/shared-theme/AppTheme";

export default function Page() {
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
              <GppBadIcon color="lightskyblue" sx={{ fontSize: 60 }} />
            </Box>

            <Typography variant="h4" color="info" gutterBottom>
              Сървърна грешка
            </Typography>

            <Typography variant="body1">
              Извинете ни за неудобството. Опитайте по-късно.
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
