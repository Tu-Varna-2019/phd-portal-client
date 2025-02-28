import { selectDoctoralCenter } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  candidatesLabelStuct,
  candidatesPieChartStruct
} from "../_constants/dashboardConstants";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import { runPeriodically } from "@/lib/helpers/utils";

export default function HomeHook() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const [candidates, setCandidates] = useState([]);
  const { getCandidates } = DoctoralCenterAPI();

  const fetchCandidates = useCallback(async () => {
    const candidatesResponse = await getCandidates();
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
      const candidateStatusesLangMapping = {
        Чакащи: "waiting",
        Приети: "accepted",
        Отказани: "rejected"
      };

      Object.entries(candidatesStruct).map(([_, value], index) => {
        candidatesStruct[index].value = candidates.reduce(
          (prev, currentValue) => {
            if (
              currentValue.status ==
              candidateStatusesLangMapping[value[pieChartKeyName]]
            )
              prev++;
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
