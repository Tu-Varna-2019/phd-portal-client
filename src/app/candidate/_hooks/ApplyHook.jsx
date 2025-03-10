import CandidateAPI from "@/lib/api/candidate";
import { runPeriodically } from "@/lib/helpers/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const initUserSelection = {
  faculty: "",
  curriculum: ""
};

export default function AppllyHook() {
  const [curriculums, setCurriculums] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [form, setForm] = useState(initUserSelection);

  const { getCurriculums, getFaculty, getSubjects } = CandidateAPI();
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

  const fetchFaculties = useCallback(async () => {
    const facultiesRes = await getFaculty();
    facultiesRes.forEach((faculty, index) => {
      faculty.id = index;
      faculty.name = ready ? t(faculty.name) : faculty.name;
    });

    setFaculties(facultiesRes);
  }, []);

  useEffect(() => {
    fetchCurriculums();
    fetchFaculties();
    return runPeriodically(() => {
      fetchCurriculums();
      fetchFaculties();
    });
  }, [fetchCurriculums, fetchFaculties]);

  return {
    curriculums,
    faculties,
    form
  };
}
