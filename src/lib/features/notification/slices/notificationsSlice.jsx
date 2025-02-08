import Notification from "@/models/Notification";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize, serialize } from "serializr";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: null
  },
  reducers: {
    setNotifications: (state, action) => {
      const notificationsObj = deserialize(Notification, action.payload);
      state.notifications = serialize(notificationsObj);
    },
    filteredNotificationsByIds: (state, action) => {
      const newNotifications = state.notifications.filter(
        (row) => !action.payload.ids.includes(row.id)
      );
      state.notifications = newNotifications;
    }
  }
});

export const { setNotifications, filteredNotificationsByIds } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
