import { Box, Container, Paper, Typography } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import CssBaseline from "@mui/material/CssBaseline";

export default function InProgress() {
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
              <AccessibleForwardIcon
                color="lightskyblue"
                sx={{ fontSize: 60 }}
              />
            </Box>

            <Typography variant="h4" color="info" gutterBottom>
              Still in progress
            </Typography>

            <Typography variant="body1">
              Currently not finished yet :/
            </Typography>
          </Paper>
        </Container>
      </Box>
    </AppTheme>
  );
}
