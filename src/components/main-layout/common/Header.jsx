"use client";

import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CustomDatePicker from "./CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import { useEffect, useRef } from "react";
import NotificationAPI from "@/lib/api/notification";
import { useAppDispatch } from "@/lib/features/constants";
import { setNotifications } from "@/lib/features/notification/slices/notificationsSlice";
import { useSelector } from "react-redux";
import selectNotifications from "@/lib/features/notification/slices/notificationsMemoSelector";
import { runPeriodically } from "@/lib/helpers/utils";

export default function Header({ headerTitle, basePath }) {
  const dispatch = useAppDispatch();

  const notifications = useSelector(selectNotifications);
  const bellSound = useRef();
  const { getNotifications } = NotificationAPI();

  // useEffect(() => {
  //   const getNotify = async () => {
  //     const result = await getNotifications();
  //
  //     if (!(JSON.stringify(result) === JSON.stringify(notifications)))
  //       bellSound.current.play();
  //
  //     dispatch(setNotifications(result));
  //   };
  //
  //   bellSound.current = new Audio("/bell.wav");
  //   return runPeriodically(() => {
  //     getNotify();
  //   });
  // }, [getNotifications]);

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs headerTitle={headerTitle} />
      <Stack direction="row" sx={{ gap: 1 }}>
        <CustomDatePicker />
        <MenuButton
          href={`${basePath}/notifications`}
          count={notifications.length}
          aria-label="Open notifications"
        >
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
