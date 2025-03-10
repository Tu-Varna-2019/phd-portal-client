import CandidateAPI from "@/lib/api/candidate";
import { runPeriodically } from "@/lib/helpers/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AppllyHook() {
  const [curriculums, setCurriculums] = useState([]);

  const { getCurriculums, getSubjects } = CandidateAPI();
  const { t, ready } = useTranslation("client-page");

  const fetchCurriculums = useCallback(async () => {
    const curriculumsResponse = await getCurriculums();
    curriculumsResponse.forEach((curriculum, index) => {
      curriculum.id = index;
      curriculum.name = ready ? t(curriculum.name) : curriculum.name;
      curriculum.mode = ready ? t(curriculum.mode) : curriculum.mode;
      curriculum.faculty = ready ? t(curriculum.faculty) : curriculum.faculty;
    });

    setCurriculums(curriculumsResponse);
  }, []);

  useEffect(() => {
    fetchCurriculums();
    return runPeriodically(() => {
      fetchCurriculums();
    });
  }, [fetchCurriculums]);

  return {
    curriculums
  };
}
