"use client";
import { styled } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import { getUserByGroup } from "@/lib/helpers/utils";
import { useIsAuthenticated } from "@azure/msal-react";
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

export default function SideMenu({ mainListItems, basePath }) {
  let user;
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) user = getUserByGroup();

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
      >
        {isAuthenticated ? (
          <>
            <Avatar
              sizes="small"
              alt="User image"
              src={user.pictureBlob}
              sx={{ width: 36, height: 36 }}
            />
            <Box sx={{ mr: "auto" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: "16px" }}
              >
                {user.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {user.email}
              </Typography>
            </Box>
            <OptionsMenu basePath={basePath} />
          </>
        ) : (
          <></>
        )}
      </Stack>
    </Drawer>
  );
}
