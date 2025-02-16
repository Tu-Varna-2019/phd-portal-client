"use client";
import AppTheme from "@/components/shared-theme/AppTheme";
import { Box, CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function Loading() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box
        sx={(theme) => ({
          display: "flex",
          backgroundColor:
            theme.palette.mode === "dark"
              ? `rgba(${theme.palette.background.defaultChannel}, 0.7)`
              : `rgba(${theme.palette.background.defaultChannel}, 0.7)`,
          backdropFilter: "blur(10px)",
          overflow: "auto",
          minHeight: "100vh",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        })}
      >
        <CircularProgress size="80px" />
      </Box>
    </AppTheme>
  );
}
