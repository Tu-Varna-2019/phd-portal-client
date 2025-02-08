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

const NOTIFICATION_INTERVAL = 5000;

export default function Header({ headerTitle }) {
  const dispatch = useAppDispatch();

  const notifications = useSelector(selectNotifications);
  const bellSound = useRef();
  const { getNotifications } = NotificationAPI();

  useEffect(() => {
    let interval;

    const getNotify = async () => {
      const result = await getNotifications().then((item) => item.data);

      if (
        result != undefined &&
        !(JSON.stringify(result) === JSON.stringify(notifications))
      )
        bellSound.current.play();

      if (result != undefined) dispatch(setNotifications(result));
    };

    bellSound.current = new Audio("/bell.wav");
    interval = setInterval(() => {
      getNotify();
    }, NOTIFICATION_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [getNotifications]);

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
          href="/notifications"
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
