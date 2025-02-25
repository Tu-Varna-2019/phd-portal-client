import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import { formatDateTime, runPeriodically } from "@/helpers/utils";
import { useEffect, useState } from "react";

export function EventManagementRowsHook() {
  const [rows, setRows] = useState([]);
  const [getLogsLoading, setGetLogsLoading] = useState(false);
  const { getLogs } = DoctoralCenterAdminAPI();

  useEffect(() => {
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
    runPeriodically(() => {
      getServerLogs();
    });
  }, [setRows]);

  return {
    rows,
    getLogsLoading,
    setRows
  };
}

export const EventManagementFilterHook = () => {
  const initialFilterBtnVal = {
    description: false,
    formattedTimestamp: false,
    level: false,
    action: false,
    oid: false,
    name: false,
    email: false,
    group: false
  };

  const { rows, getLogsLoading } = EventManagementRowsHook();
  const [filterLogs, setFilterLogs] = useState([]);
  const [filterState, setFilterState] = useState(initialFilterBtnVal);

  const setAllFilters = (bool) => {
    const filter = Object.fromEntries(
      Object.entries(initialFilterBtnVal).map(([key]) => [key, bool])
    );
    return filter;
  };

  const isAnyFilterPressed = () => {
    return Object.values(filterState).some((value) => value == true);
  };

  useEffect(() => {
    setFilterLogs(rows);
  }, [rows]);

  const searchLogs = (event) => {
    const filterActivation = isAnyFilterPressed()
      ? filterState
      : setAllFilters(true);

    const searchInputFiltered = rows.filter((row) => {
      return Object.keys(row).some((item) => {
        if (filterActivation[item] && row[item] != null) {
          return (
            row[item].includes(event.target.value) ||
            row[item].includes(event.target.value.toLowerCase())
          );
        } else return false;
      });
    });

    if (event == "") setFilterLogs(rows);
    else setFilterLogs(searchInputFiltered);
  };

  const setFilterStateOnClick = (key) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return {
    searchLogs,
    setFilterStateOnClick,
    getLogsLoading,
    filterState,
    filterLogs
  };
};
