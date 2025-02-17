import LogsAPI from "@/api/logs";
import NotificationAPI from "@/api/notification";
import { useAppDispatch } from "@/features/constants";
import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";

export default function APIWrapper() {
  const dispatch = useAppDispatch();
  const { saveNotification } = NotificationAPI();
  const { saveLog } = LogsAPI();

  const logNotifyAlert = ({
    title,
    description,
    message,
    action,
    level,
    scope,
    group
  }) => {
    saveLog({
      description: description,
      action: action,
      level: level
    });

    saveNotification({
      title: title,
      description: description,
      severity: level,
      scope: scope,
      group: group
    });

    dispatch(setAlertBox({ message: message, level: level }));
  };

  const logAlert = ({ message, description, action, level }) => {
    saveLog({
      description: description,
      action: action,
      level: level
    });
    dispatch(setAlertBox({ message: message, level: level }));
  };

  return {
    logNotifyAlert,
    logAlert
  };
}
