import { useCallback, useEffect, useState } from "react";
import { formatDateTime } from "@/lib/helpers/utils";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import APIWrapper from "@/lib/helpers/APIWrapper";
import PhdAPI from "@/lib/api/PhdAPI";

export default function ReportsHook() {
  const { language, tr } = Translate();
  const { logAlert } = APIWrapper();
  const { getReports } = PhdAPI();

  const [reports, setReports] = useState([]);

  const [selectedReport, setSelectedReport] = useState({});
  const [isReportOpened, setIsReportOpened] = useState(false);

  const fetchReports = useCallback(async () => {
    const reportsResponse = await getReports();

    if (reportsResponse.status == "error") {
      logAlert({
        message: tr(reportsResponse.message),
        description: "Проблем при извличането на отчетите",
        action: "Проблем при извличането на отчетите",
        level: "error"
      });
    } else {
      reportsResponse.forEach((report, index) => {
        report.id = index;
        report.conduct = tr(report.conduct);
        report.enrollmentDate = formatDateTime(report.enrollmentDate);
      });

      setReports(reportsResponse);
    }
  }, [language]);

  useEffect(() => {
    fetchReports();
    return runPeriodically(() => {
      fetchReports();
    });
  }, [fetchReports]);

  return {
    reports,
    selectedReport,
    setSelectedReport,
    isReportOpened,
    setIsReportOpened
  };
}
