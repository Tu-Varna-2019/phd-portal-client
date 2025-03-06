"use client";
import { styled } from "@mui/material/styles";

import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MenuContent from "./MenuContent";
const drawerWidth = 270;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box"
  }
});

export default function SideMenuPublic({ mainListItems }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper"
        }
      }}
    >
      <Divider />
      <MenuContent mainListItems={mainListItems} />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider"
        }}
      ></Stack>
    </Drawer>
  );
}
