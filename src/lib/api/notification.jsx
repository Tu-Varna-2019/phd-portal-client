"use client";
import ClientRoute from "./router/client";

const API_URL = "/api/notification";

export default function NotificationAPI() {
  const { route } = ClientRoute();

  const getNotifications = async () => {
    return await route({ url: API_URL, method: "GET" });
  };

  const saveNotification = ({
    title,
    description,
    scope,
    severity,
    group,
    recipients
  }) => {
    return route({
      url: API_URL,
      method: "POST",
      body: {
        title,
        description,
        scope,
        severity,
        group,
        recipients
      }
    });
  };

  const deleteNotifications = async (notifications) => {
    return await route({ url: API_URL, method: "DELETE", body: notifications });
  };

  return {
    getNotifications,
    saveNotification,
    deleteNotifications
  };
}
