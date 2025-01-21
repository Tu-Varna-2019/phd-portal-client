import DoctoralCenterAPI from "@/lib/api/doctralCenter";
import { formatDateTime } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function EventManagementGridData() {
  const [rows, setRows] = useState([]);
  const [getLogsLoading, setGetLogsLoading] = useState(false);
  const { getLogs } = DoctoralCenterAPI();

  useEffect(() => {
    const getServerLogs = async () => {
      setGetLogsLoading(true);
      const logs = await getLogs();

      let idCounter = 0;
      if (logs != null) {
        // NOTE: Format datetime
        logs.forEach((log) => {
          const timestamp = log.timestamp;
          log.formattedTimestamp = formatDateTime(timestamp);
          log.id = idCounter++;
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
  }, [setRows]);

  const columns = [
    { field: "description", headerName: "Описание", flex: 1.5, minWidth: 200 },
    {
      field: "formattedTimestamp",
      headerName: "Време",
      flex: 1,
      minWidth: 250
    },
    {
      field: "action",
      headerName: "Действие",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 250
    },
    {
      field: "level",
      headerName: "Ниво",
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 100
    },
    {
      field: "oid",
      headerName: "Oid",
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    },
    {
      field: "name",
      headerName: "Име",
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    },
    {
      field: "email",
      headerName: "Имейл",
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    },
    {
      field: "group",
      headerName: "Група",
      headerAlign: "right",
      align: "right",
      flex: 2,
      minWidth: 300
    }
  ];

  return {
    rows,
    columns,
    getLogsLoading,
    setRows
  };
}
