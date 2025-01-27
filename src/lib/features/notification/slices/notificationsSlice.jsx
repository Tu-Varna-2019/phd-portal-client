import Notification from "@/models/Notification";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize, serialize } from "serializr";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: []
  },
  reducers: {
    setNotifications: (state, action) => {
      const notificationsObj = deserialize(Notification, action.payload);
      state.notifications = serialize(notificationsObj);
    }
  }
});

export const { setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
