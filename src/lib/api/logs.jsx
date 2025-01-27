import Log from "@/models/Log";
import ClientRoute from "./router/client";
const API_URL = "/api/logs";

// TODO: Switch to client api from lib
export default function LogsAPI() {
  const { route } = ClientRoute();

  const saveLog = ({ description, action, level }) => {
    const log = new Log(description, action, level);
    route(API_URL, "POST", log);
  };

  return {
    saveLog
  };
}
