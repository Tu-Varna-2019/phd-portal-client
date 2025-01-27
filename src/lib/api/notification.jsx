"use client";
import ClientRoute from "./router/client";

const API_URL = "/api/notification";

export default function NotificationAPI() {
  const { route } = ClientRoute();

  const getNotifications = async () => {
    return await route(API_URL, "GET");
  };

  const saveNotification = ({
    title,
    description,
    scope,
    severity,
    group,
    recipients
  }) => {
    return route(API_URL, "POST", {
      title,
      description,
      scope,
      severity,
      group,
      recipients
    });
  };

  const deleteNotifications = async (notifications) => {
    return await route(API_URL, "DELETE", notifications, false);
  };

  return {
    getNotifications,
    saveNotification,
    deleteNotifications
  };
}
