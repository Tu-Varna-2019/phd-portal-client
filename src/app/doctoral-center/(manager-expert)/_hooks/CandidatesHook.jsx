import { useCallback, useEffect, useState } from "react";

import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import DoctoralCenterAPI from "@/api/DoctoralCenterAPI";
import APIWrapper from "@/lib/helpers/APIWrapper";

export default function CandidatesHook() {
  const { getCandidates } = DoctoralCenterAPI();
  const [candidates, setCandidates] = useState([]);
  const { tr, language } = Translate();
  const { logAlert } = APIWrapper();

  const fetchCandidates = useCallback(async () => {
    const candidatesRes = await getCandidates(
      "name,status,exam_step,email,pin,post_code,country,city,address,faculty,biography,post_code,curriculum"
    );

    if (candidatesRes.status == "error") {
      logAlert({
        message: tr(candidatesRes.message),
        description: "Проблем при извличането на кандидати",
        action: "Проблем при извличането на кандидати",
        level: "error"
      });
    } else {
      candidatesRes.forEach((user, index) => {
        user.id = index;
        user.curriculum = tr(user.curriculum);
      });

      setCandidates(candidatesRes.filter((user) => user.status == "waiting"));
    }
  }, [language]);

  useEffect(() => {
    fetchCandidates();
    return runPeriodically(() => {
      fetchCandidates();
    });
  }, [fetchCandidates]);

  return {
    candidates
  };
}
