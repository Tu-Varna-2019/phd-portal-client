import APIWrapper from "@/helpers/APIWrapper";
import { filteredNotificationsByIds } from "@/features/notification/slices/notificationsSlice";
import NotificationAPI from "@/api/NotificationAPI";
import { useState } from "react";
import { useAppDispatch } from "@/features/constants";
import { useSelector } from "react-redux";
import selectNotifications from "@/features/notification/slices/notificationsMemoSelector";
import Translate from "@/lib/helpers/Translate";

export default function NotificationHook() {
  const dispatch = useAppDispatch();
  const { tr } = Translate();

  const notifications = useSelector(selectNotifications);
  const [selectedRows, setSelectedRows] = useState([]);
  const { deleteNotifications } = NotificationAPI();
  const [openDialogBoxYesNo, setOpenDialogBoxYesNo] = useState(false);
  const { logAlert } = APIWrapper();

  const onDeleteNotisClick = async () => {
    const idsObj = [];
    selectedRows.forEach((notif) => idsObj.push({ id: notif.id }));
    console.log(`Selected: ${JSON.stringify(idsObj)}`);
    const deletedNotifs = await deleteNotifications(idsObj);

    if (deletedNotifs.status == "success") {
      dispatch(filteredNotificationsByIds({ ids: selectedRows }));
      logAlert({
        message: tr(deletedNotifs.message),
        description: "Потребителят си изтри нотификациите!",
        action: "Изтриване на нотификации",
        level: "success"
      });
    } else {
      logAlert({
        message: tr(deletedNotifs.message),
        description: "Проблем при изтриването на известия",
        action: "Проблем при изтриването на известия",
        level: "error"
      });
    }
    setOpenDialogBoxYesNo(false);
  };

  return {
    setOpenDialogBoxYesNo,
    selectedRows,
    notifications,
    setSelectedRows,
    onDeleteNotisClick,
    openDialogBoxYesNo
  };
}
