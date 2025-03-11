import CandidateAPI from "@/lib/api/candidate";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const initUserSelection = {
  faculty: "",
  curriculum: ""
};

export default function AppllyHook() {
  const [curriculumsByFaculty, setCurriculumsByFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [form, setForm] = useState(initUserSelection);
  const [activeStep, setActiveStep] = useState(0);

  const { getCurriculums, getFaculty, getSubjects } = CandidateAPI();
  const { t, ready } = useTranslation("client-page");

  const fetchFaculties = useCallback(async () => {
    if (faculties.length > 0) return;

    const facultiesRes = await getFaculty();
    facultiesRes.forEach((faculty, index) => {
      faculty.id = index;
      faculty.name = ready ? t(faculty.name) : faculty.name;
    });

    setFaculties(facultiesRes);
  }, [faculties, ready, t]);

  const fetchCurriculumsByFaculty = useCallback(async () => {
    if (curriculumsByFaculty.length > 0) return;

    const curriculumsResponse = await getCurriculums();
    curriculumsResponse.forEach((curriculum, index) => {
      // if (curriculum.faculty == selectedFaculty) {
      curriculum.id = index;
      curriculum.name = ready ? t(curriculum.name) : curriculum.name;
      curriculum.mode = ready ? t(curriculum.mode) : curriculum.mode;
      curriculum.faculty = ready ? t(curriculum.faculty) : curriculum.faculty;
      // }
    });

    setCurriculumsByFaculty(curriculumsResponse);
  }, [faculties]);

  const titleText = useMemo(() => {
    if (activeStep == 0) {
      return t("Choose a faculty");
    } else if (activeStep == 1) {
      return t("Choose or create your curriculum");
    }
  }, [activeStep]);

  useEffect(() => {
    if (activeStep == 0) {
      fetchFaculties();
    } else if (activeStep == 1) {
      fetchCurriculumsByFaculty();
    }
  }, [activeStep, fetchFaculties, fetchCurriculumsByFaculty]);

  const disableNextBtn = useMemo(() => {
    if (activeStep == 0) {
      return selectedFaculty === "";
    } else if (activeStep === 1) {
    }
  }, [activeStep, selectedFaculty]);

  return {
    activeStep,
    setActiveStep,
    curriculumsByFaculty,
    faculties,
    form,
    selectedFaculty,
    setSelectedFaculty,
    titleText,
    disableNextBtn
  };
}
