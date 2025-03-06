"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import CssBaseline from "@mui/material/CssBaseline";
import HomeIcon from "@mui/icons-material/Home";
import AppTheme from "@/components/shared-theme/AppTheme";

const NotFoundErrorPage = () => {
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
              <HelpIcon color="lightskyblue" sx={{ fontSize: 60 }} />
            </Box>

            <title>404 Not Found</title>

            <Typography variant="h4" color="info" gutterBottom>
              404 Страницата на съществува
            </Typography>

            <Typography variant="body1">
              За съжаление не можахме да намерим страницата, която търсите. :(
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
                Обратно
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </AppTheme>
  );
};

export default NotFoundErrorPage;
