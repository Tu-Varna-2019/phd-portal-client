import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import { formatDateTime } from "@/helpers/utils";
import { useEffect, useState } from "react";

export default function EventManagementGridData() {
  const [rows, setRows] = useState([]);
  const [getLogsLoading, setGetLogsLoading] = useState(false);
  const { getLogs } = DoctoralCenterAdminAPI();

  useEffect(() => {
    let interval;
    const getServerLogs = async () => {
      setGetLogsLoading(true);
      const logs = await getLogs();

      let idCounter = 0;
      if (logs != null) {
        // TODO: Improve me!  Need to create a utils function for flattening object
        logs.flat();
        logs.forEach((log) => {
          log.id = idCounter++;
          log.formattedTimestamp = formatDateTime(log.timestamp);
          log.oid = log.user.oid;
          log.name = log.user.name;
          log.email = log.user.email;
          log.group = log.user.group;
        });
        setRows(logs);
      }

      setGetLogsLoading(false);
    };

    getServerLogs();
    interval = setInterval(() => {
      getServerLogs();
    }, process.env.NEXT_PUBLIC_FETCH_API_DURATION);
  }, [setRows]);

  return {
    rows,
    getLogsLoading,
    setRows
  };
}
