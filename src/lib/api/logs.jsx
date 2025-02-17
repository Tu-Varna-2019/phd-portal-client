import Log from "@/models/Log";
import ClientRoute from "@/router/client";
const API_URL = "/api/logs";

export default function LogsAPI() {
  const { route } = ClientRoute();

  const saveLog = ({ description, action, level }) => {
    const log = new Log(description, action, level);
    route({ url: API_URL, method: "POST", body: log });
  };

  return {
    saveLog
  };
}
