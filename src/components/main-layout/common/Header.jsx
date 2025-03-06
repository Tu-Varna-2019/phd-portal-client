"use client";

import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CustomDatePicker from "./CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import { useCallback, useEffect, useRef } from "react";
import NotificationAPI from "@/lib/api/notification";
import { useAppDispatch } from "@/lib/features/constants";
import { setNotifications } from "@/lib/features/notification/slices/notificationsSlice";
import { useSelector } from "react-redux";
import selectNotifications from "@/lib/features/notification/slices/notificationsMemoSelector";
import { formatDateTime, runPeriodically } from "@/lib/helpers/utils";
import { useTranslation } from "react-i18next";

export default function Header({ headerTitle, basePath }) {
  const { t, ready } = useTranslation("client-page");
  const dispatch = useAppDispatch();

  const notifications = useSelector(selectNotifications);
  const bellSound = useRef();
  const { getNotifications } = NotificationAPI();

  const fetchNotifications = useCallback(async () => {
    let idCounter = 0;
    const result = await getNotifications();
    result.forEach((notif) => {
      notif.id = idCounter++;
      notif.severity = ready ? t(notif.severity) : notif.severity;
      notif.creation = formatDateTime(notif.creation);
    });

    if (!(JSON.stringify(result) === JSON.stringify(notifications))) {
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
