"use client";
import AuthHook from "@/hooks/AuthHook";
import { Box, Container, Paper, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "@/components/shared-theme/AppTheme";
import Translate from "@/lib/helpers/Translate";

export default function AuthInfo() {
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
              <InfoIcon color="lightskyblue" sx={{ fontSize: 60 }} />
            </Box>

            <Typography variant="h4" color="info" gutterBottom>
              {tr("Login")}
            </Typography>

            <Typography variant="body1">
              {tr(
                "We are currently redirecting you to the Microsoft page. Please log in with your account, which is intended for Technical University of Varna"
              )}
            </Typography>

            <AuthHook />
          </Paper>
        </Container>
      </Box>
    </AppTheme>
  );
}
