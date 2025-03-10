import CandidateAPI from "@/lib/api/candidate";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const initUserSelection = {
  faculty: "",
  curriculum: ""
};

export default function AppllyHook() {
  const [curriculumsByFaculty, setCurriculumsByFaculty] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [form, setForm] = useState(initUserSelection);
  const [activeStep, setActiveStep] = useState(0);

  const { getCurriculums, getFaculty, getSubjects } = CandidateAPI();
  const { t, ready } = useTranslation("client-page");

  const fetchCurriculumsByFaculty = useCallback(async () => {
    if (curriculumsByFaculty.length > 0) return;

    const curriculumsResponse = await getCurriculums();
    curriculumsResponse.forEach((curriculum, index) => {
      curriculum.id = index;
      curriculum.name = ready ? t(curriculum.name) : curriculum.name;
      curriculum.mode = ready ? t(curriculum.mode) : curriculum.mode;
      curriculum.faculty = ready ? t(curriculum.faculty) : curriculum.faculty;
    });

    setCurriculumsByFaculty(curriculumsResponse);
  }, []);

  const fetchFaculties = useCallback(async () => {
    if (faculties.length > 0) return;

    const facultiesRes = await getFaculty();
    facultiesRes.forEach((faculty, index) => {
      faculty.id = index;
      faculty.name = ready ? t(faculty.name) : faculty.name;
    });

    setFaculties(facultiesRes);
  }, []);

  useEffect(() => {
    if (activeStep == 0) {
      fetchFaculties();
    } else if (activeStep == 1) {
      fetchCurriculumsByFaculty();
    }
  }, [activeStep, fetchFaculties, fetchCurriculumsByFaculty]);

  return {
    activeStep,
    fetchFaculties,
    fetchCurriculumsByFaculty,
    setActiveStep,
    curriculumsByFaculty,
    faculties,
    form
  };
}
