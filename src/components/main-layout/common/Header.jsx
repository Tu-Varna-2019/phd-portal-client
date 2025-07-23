"use client";

import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CustomDatePicker from "./CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import { useCallback, useEffect, useRef } from "react";
import NotificationAPI from "@/api/NotificationAPI";
import { useAppDispatch } from "@/lib/features/constants";
import { setNotifications } from "@/lib/features/notification/slices/notificationsSlice";
import { useSelector } from "react-redux";
import selectNotifications from "@/lib/features/notification/slices/notificationsMemoSelector";
import {
  DateTimeLocale,
  formatDateTime,
  runPeriodically
} from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";

export default function Header({ headerTitle, basePath }) {
  const { tr, language } = Translate();
  const dispatch = useAppDispatch();

  const notifications = useSelector(selectNotifications);
  const bellSound = useRef();
  const { getNotifications } = NotificationAPI();

  const fetchNotifications = useCallback(async () => {
    const result = await getNotifications();

    result.forEach((notif) => {
      notif.severity = tr(notif.severity);
      notif.creation = formatDateTime(notif.creation, DateTimeLocale[language]);
    });

    if (result.length != notifications.length) {
      bellSound.current.play();
    }

    dispatch(setNotifications(result));
  }, []);

  useEffect(() => {
    bellSound.current = new Audio("/bell.wav");
    fetchNotifications();
    return runPeriodically(() => {
      fetchNotifications();
    });
  }, [fetchNotifications]);

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
