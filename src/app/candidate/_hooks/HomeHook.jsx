import { useCallback, useEffect, useState } from "react";
import { cleanColumns, runPeriodically } from "@/lib/helpers/utils";
import CandidateAPI from "@/api/CandidateAPI";
import Translate from "@/lib/helpers/Translate";

export default function HomeHook() {
  const [curriculums, setCurriculums] = useState([]);
  const { getCurriculums } = CandidateAPI();
  const { tr, language } = Translate();

  const fetchCurriculums = useCallback(async () => {
    const curriculumsResponse = await getCurriculums();
    curriculumsResponse.forEach((curriculum, index) => {
      curriculum.id = index;
      curriculum.name = tr(curriculum.name);

      let mode = tr(curriculum.mode);
      mode = cleanColumns(mode);

      curriculum.mode = mode;
      curriculum.faculty = tr(curriculum.faculty);
    });

    setCurriculums(curriculumsResponse);
  }, [language]);

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
