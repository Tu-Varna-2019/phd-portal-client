import APIWrapper from "@/helpers/APIWrapper";
import { filteredNotificationsByIds } from "@/features/notification/slices/notificationsSlice";
import NotificationAPI from "@/api/notification";
import { useState } from "react";
import { useAppDispatch } from "@/features/constants";
import { useSelector } from "react-redux";
import selectNotifications from "@/features/notification/slices/notificationsMemoSelector";

export default function NotificationHook() {
  const dispatch = useAppDispatch();
  const notifications = useSelector(selectNotifications);
  const [selectedRows, setSelectedRows] = useState([]);
  const { deleteNotifications } = NotificationAPI();
  const [openDialogBoxYesNo, setOpenDialogBoxYesNo] = useState(false);
  const { logAlert } = APIWrapper();

  const onDeleteNotisClick = async () => {
    const idsObj = [{}];
    selectedRows.forEach((id) => idsObj.push({ id: id }));
    const deletedNotifs = await deleteNotifications(idsObj);

    if (deletedNotifs != undefined) {
      dispatch(filteredNotificationsByIds({ ids: selectedRows }));

      logAlert({
        message: tr(deletedNotifs.message),
        description: "Потребителят си изтри нотификациите!",
        action: "Изтриване на нотификации",
        level: "success"
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
