import { selectDoctoralCenter } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import { DashboardConstants } from "../_constants/dashboardConstants";

export default function HomeHook() {
  const { tr } = Translate();
  const { candidatesLabelStuct, candidatesPieChartStruct } =
    DashboardConstants();

  const doctoralCenter = useSelector(selectDoctoralCenter);
  const [candidates, setCandidates] = useState([]);
  const { getCandidates } = DoctoralCenterAPI();

  const fetchCandidates = useCallback(async () => {
    const candidatesResponse = await getCandidates("status");
    setCandidates(candidatesResponse);
  }, []);

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
