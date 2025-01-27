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

const xThemeComponents = {
  ...datePickersCustomizations,
  ...treeViewCustomizations
};

export default function Layout({ headerTitle, MainView, mainListItems }) {
  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu mainListItems={mainListItems} />
        <AppNavbar />
        {/* Main content */}
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
            <Header headerTitle={headerTitle} />
            <MainView />
            {/*Main Conent is here*/}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
