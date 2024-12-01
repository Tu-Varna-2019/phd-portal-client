import { Box, Container, Paper, Typography } from "@mui/material";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import AppTheme from "../shared-theme/AppTheme";
import { LoadingButton } from "@mui/lab";

import CssBaseline from "@mui/material/CssBaseline";
import AuthHook from "@/hooks/AuthHook";
import { useState } from "react";

export default function SignIn() {
  const { handleLogin } = AuthHook();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
              401 - Unauthorized
            </Typography>

            <Typography variant="body1" paragraph>
              You do not have permission to view this page. Please check your
              credentials or contact the administrator.
            </Typography>

            <Box sx={{ marginTop: 2 }}>
              <LoadingButton
                color="info"
                disabled={isButtonDisabled}
                loading={isButtonDisabled}
                size="medium"
                variant="contained"
                onClick={() => {
                  setIsButtonDisabled(true);
                  handleLogin();
                }}
                sx={{ marginRight: 2 }}
              >
                Sign in
              </LoadingButton>
            </Box>
          </Paper>
        </Container>
      </Box>
    </AppTheme>
  );
}
