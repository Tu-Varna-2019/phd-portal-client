import { useCallback, useEffect, useMemo, useState } from "react";
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
      curriculum.description = ready
        ? t(curriculum.description)
        : curriculum.description;
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

  const curriculumSubjects = useMemo(() => {
    return curriculums.map((curriculum) => {
      return {
        description: curriculum.description,
        subjects: curriculum.subjects.map((subject, index) => ({
          id: index,
          name: ready ? t(subject) : subject
        }))
      };
    });
  }, [curriculums]);

  return {
    curriculums,
    curriculumSubjects
  };
}
