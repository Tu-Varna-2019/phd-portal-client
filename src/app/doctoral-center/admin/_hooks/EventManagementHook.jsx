import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import { formatDateTime, runPeriodically } from "@/helpers/utils";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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

export default function EventManagementHook() {
  const [logs, setLogs] = useState([]);
  const [filterLogs, setFilterLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const { getLogs } = DoctoralCenterAdminAPI();
  const { t, ready } = useTranslation("client-page");
  const [filterState, setFilterState] = useState(initialFilterBtnVal);

  const flattenLogs = (logs) => {
    let idCounter = 0;
    if (logs != []) {
      // TODO: Improve me!  Need to create a utils function for flattening object
      logs.flat();
      logs.forEach((log) => {
        log.id = idCounter++;
        log.formattedTimestamp = formatDateTime(log.timestamp);
        log.oid = log.user.oid;
        log.name = log.user.name;
        log.email = log.user.email;
        log.level = ready ? t(log.level.toLowerCase()) : log.level;
        log.group = ready ? t(log.user.group) : log.user.group;
      });
      return logs;
    }
    return [];
  };

  const fetchLogs = useCallback(async () => {
    const logsResponse = flattenLogs(await getLogs());
    if (logsResponse != logs) {
      setLogsLoading(true);
      setLogs(logsResponse);
    }
    setLogsLoading(false);
  }, []);

  useEffect(() => {
    fetchLogs();
    return runPeriodically(() => {
      fetchLogs();
    });
  }, [fetchLogs]);

  useEffect(() => {
    setFilterLogs(logs);
  }, [logs]);

  const setAllFilters = (bool) => {
    const filter = Object.fromEntries(
      Object.entries(initialFilterBtnVal).map(([key]) => [key, bool])
    );
    return filter;
  };

  const isAnyFilterPressed = () => {
    return Object.values(filterState).some((value) => value == true);
  };

  const searchLogsOnChange = useCallback(
    (event) => {
      const filterActivation = isAnyFilterPressed()
        ? filterState
        : setAllFilters(true);

      const searchInputFiltered = logs.filter((row) => {
        return Object.keys(row).some((item) => {
          if (filterActivation[item] && row[item] != null) {
            return (
              row[item].includes(event.target.value) ||
              row[item].includes(event.target.value.toLowerCase())
            );
          } else return false;
        });
      });
      event == "" ? setFilterLogs(logs) : setFilterLogs(searchInputFiltered);
    },
    [filterState, logs, filterLogs]
  );

  const setFilterStateOnClick = (key) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return {
    searchLogsOnChange,
    setFilterStateOnClick,
    logsLoading,
    filterState,
    filterLogs
  };
}
