import { selectDoctoralCenter } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import DoctoralCenterAPI from "@/api/DoctoralCenterAPI";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import { DashboardConstants } from "../_constants/dashboardConstants";
import APIWrapper from "@/lib/helpers/APIWrapper";

export default function HomeHook() {
  const { tr, language } = Translate();
  const { logAlert } = APIWrapper();

  const { candidatesLabelStuct, candidatesPieChartStruct } =
    DashboardConstants();

  const doctoralCenter = useSelector(selectDoctoralCenter);
  const [candidates, setCandidates] = useState([]);
  const { getCandidates } = DoctoralCenterAPI();

  const fetchCandidates = useCallback(async () => {
    const candidatesResponse = await getCandidates("status");

    if (candidatesResponse.status == "error") {
      logAlert({
        message: tr(candidatesResponse.message),
        description: "Проблем при извличането на кандидати",
        action: "Проблем при извличането на кандидати",
        level: "error"
      });
    } else {
      setCandidates(candidatesResponse);
    }
  }, [language]);

  useEffect(() => {
    fetchCandidates();
    return runPeriodically(() => {
      fetchCandidates();
    });
  }, [fetchCandidates]);

  const candidatesTotal = useMemo(() => {
    return candidates.length;
  }, [candidates]);

  const getChartCandidates = useCallback(
    (candidatesStruct, pieChartKeyName) => {
      Object.entries(candidatesStruct).map(([_, value], index) => {
        candidatesStruct[index].value = candidates.reduce(
          (prev, currentValue) => {
            if (currentValue.status == tr(value[pieChartKeyName], "en")) prev++;
            return prev;
          },
          0
        );
      });
      return candidatesStruct;
    },
    [candidates]
  );

  const candidatesPieChartLabel = useMemo(() => {
    return getChartCandidates(candidatesLabelStuct, "name");
  }, [candidates]);

  const candidatesPieChart = useMemo(() => {
    return getChartCandidates(candidatesPieChartStruct, "label");
  }, [candidates]);

  return {
    name: doctoralCenter.name,
    candidatesTotal,
    candidatesPieChart,
    candidatesPieChartLabel
  };
}
