import Notification from "@/models/Notification";
import { createSelector } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

const selectNotificationState = (state) => state.notifications.notifications;

const selectNotifications = createSelector(
  [selectNotificationState],
  (stateNotification) => {
    return stateNotification
      ? deserialize(Notification, stateNotification)
      : new Notification();
  }
);

export default selectNotifications;
