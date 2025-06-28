"use client";

import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CancelIcon from "@mui/icons-material/Cancel";
import AppTheme from "@/components/shared-theme/AppTheme";
import Auth from "@/lib/auth/auth";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { handleLogout } = Auth();
  const { tr } = Translate();

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
              <CancelIcon color="lightskyblue" sx={{ fontSize: 60 }} />
            </Box>

            <Typography variant="h4" color="info" gutterBottom>
              {"403 " + tr("Forbidden")}
            </Typography>

            <Typography variant="body1">
              {tr(
                "You do not have the necessary authorization to access this page. Please contact the Administrator for access."
              )}
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Button
                color="info"
                size="medium"
                href="/"
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={() => {}}
                sx={{ marginRight: 2 }}
              >
                {tr("Back")}
              </Button>

              <Button
                color="info"
                size="medium"
                onClick={handleLogout}
                variant="contained"
                startIcon={<HomeIcon />}
                sx={{ marginRight: 2 }}
              >
                {tr("Exit")}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </AppTheme>
  );
}
