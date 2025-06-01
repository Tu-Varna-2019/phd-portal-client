import { useCallback, useEffect, useState } from "react";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";

export default function ExamsHook() {
  const { language, tr } = Translate();
  const { getGrades } = DoctoralCenterAPI();
  const [exams, setExams] = useState();

  const fetchExams = useCallback(async () => {
    const examsResponse = await getGrades();
    examsResponse.forEach((exam, index) => {
      exam.id = index;
      exam.subject = tr(exam.subject);
    });

    setExams(examsResponse);
  }, [language]);

  useEffect(() => {
    fetchExams();
    return runPeriodically(() => {
      fetchExams();
    });
  }, [fetchExams]);

  return {
    exams
  };
}
