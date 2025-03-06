import { useCallback, useEffect, useState } from "react";
import { runPeriodically } from "@/lib/helpers/utils";
import CandidateAPI from "@/lib/api/candidate";
import { useTranslation } from "react-i18next";

export default function HomeHook() {
  const [curriculums, setCurriculums] = useState([]);
  const { getCurriculums } = CandidateAPI();
  const { t, ready } = useTranslation("client-page");

  const fetchCurriculums = useCallback(async () => {
    let idCounter = 0;
    const curriculumsResponse = await getCurriculums();
    curriculumsResponse.forEach((curriculum) => {
      curriculum.id = idCounter++;
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
