import { useCallback, useEffect, useState } from "react";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";

export default function ExamsHook() {
  const { language, tr } = Translate();
  const { getGrades, getCommision } = DoctoralCenterAPI();
  const [exams, setExams] = useState();
  const [commisions, setCommisions] = useState();

  const fetchExams = useCallback(async () => {
    const examsResponse = await getGrades();
    examsResponse.forEach((exam) => {
      exam.subject = tr(exam.subject);
    });

    setExams(examsResponse);
  }, [language]);

  const fetchCommisions = useCallback(async () => {
    const commisionsResponse = await getCommision();

    commisionsResponse.forEach((commision, index) => {
      commision.id = index;
    });
    setCommisions(commisionsResponse);
  }, [language]);

  useEffect(() => {
    fetchExams();
    fetchCommisions();
    return runPeriodically(() => {
      fetchExams();
      fetchCommisions();
    });
  }, [fetchExams, fetchCommisions]);

  return {
    exams,
    commisions
  };
}
