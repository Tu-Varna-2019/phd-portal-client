import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./common/AppNavbar";
import Header from "./common/Header";
import AppTheme from "../shared-theme/AppTheme";
import {
  datePickersCustomizations,
  treeViewCustomizations
} from "./theme/customizations";
import SideMenu from "./common/SideMenu";
import { useIsAuthenticated } from "@azure/msal-react";
import SideMenuPublic from "./common/SideMenuPublic";
import HeaderPublic from "./common/HeaderPublic";

const xThemeComponents = {
  ...datePickersCustomizations,
  ...treeViewCustomizations
};

export default function Layout({
  headerTitle,
  basePath,
  MainView,
  mainListItems
}) {
  const isAuthenticated = useIsAuthenticated();

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        {isAuthenticated ? (
          <SideMenu mainListItems={mainListItems} basePath={basePath} />
        ) : (
          <SideMenuPublic mainListItems={mainListItems} />
        )}
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto"
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 }
            }}
          >
            {isAuthenticated ? (
              <Header headerTitle={headerTitle} basePath={basePath} />
            ) : (
              <HeaderPublic headerTitle={headerTitle} />
            )}
            {MainView}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
