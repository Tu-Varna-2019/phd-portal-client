import { selectCommittee } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import DoctoralCenterAPI from "@/api/DoctoralCenterAPI";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import { DashboardConstants } from "../_constants/dashboardConstants";

export default function HomeHook() {
  const { tr, language } = Translate();
  const { candidatesLabelStuct, candidatesPieChartStruct } =
    DashboardConstants();

  const committee = useSelector(selectCommittee);
  const [candidates, setCandidates] = useState([]);
  const { getCandidates } = DoctoralCenterAPI();

  const fetchCandidates = useCallback(async () => {
    const candidatesResponse = await getCandidates("status");
    setCandidates(candidatesResponse);
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
    name: committee.name,
    candidatesTotal,
    candidatesPieChart,
    candidatesPieChartLabel
  };
}
