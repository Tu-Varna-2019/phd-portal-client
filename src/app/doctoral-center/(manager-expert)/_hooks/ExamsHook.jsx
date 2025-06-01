import { useCallback, useEffect, useState } from "react";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";

export default function ExamsHook() {
  const { language } = Translate();
  const { getExams } = DoctoralCenterAPI();
  const [exams, setExams] = useState();

  const fetchExams = useCallback(async () => {
    const examsResponse = await getExams();
    setExams(examsResponse);
  }, [language]);

  useEffect(() => {
    fetchExams();
    fetchCommision();
    return runPeriodically(() => {
      fetchExams();
      fetchCommision();
    });
  }, [fetchExams]);

  return {
    exams
  };
}
