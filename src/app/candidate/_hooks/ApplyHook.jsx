import CandidateAPI from "@/lib/api/candidate";
import Translate from "@/lib/helpers/Translate";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const { tr } = Translate();

  const { getCurriculums, getFaculty, getSubjects } = CandidateAPI();

  const fetchFaculties = useCallback(async () => {
    if (faculties.length > 0) return;

    const facultiesRes = await getFaculty();
    facultiesRes.forEach((faculty, index) => {
      faculty.id = index;
      faculty.name = tr(faculty.name);
    });

    setFaculties(facultiesRes);
  }, [faculties, tr]);

  const fetchCurriculumsByFaculty = useCallback(async () => {
    if (curriculumsByFaculty.length > 0) return;

    const curriculumsResponse = await getCurriculums();
    const selectedFacultyEN = tr(selectedFaculty, "en");

    const curriculumFilterBySelectedFaculty = curriculumsResponse
      .filter((curriculum) => curriculum.faculty == selectedFacultyEN)
      .map((curriculum, index) => {
        curriculum.id = index;
        curriculum.name = tr(curriculum.name);
        curriculum.mode = tr(curriculum.mode);
        curriculum.faculty = tr(curriculum.faculty);
      });

    setCurriculumsByFaculty(curriculumFilterBySelectedFaculty);
  }, [faculties, selectedFaculty]);

  const titleText = useMemo(() => {
    if (activeStep == 0) {
      return tr("Choose a faculty");
    } else if (activeStep == 1) {
      return tr("Choose or create your curriculum");
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
