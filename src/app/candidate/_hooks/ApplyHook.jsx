import CandidateAPI from "@/lib/api/candidate";
import Translate from "@/lib/helpers/Translate";
import { useEffect, useMemo, useState } from "react";
import CandidateColumnConstants from "../_constants/columnsConstant";
import { cleanColumns } from "@/lib/helpers/utils";
import { useSelector } from "react-redux";
import { selectCandidate } from "@/lib/features/user/slices/userMemoSelector";

export default function AppllyHook() {
  const [curriculumsByFaculty, setCurriculumsByFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState();
  const [faculties, setFaculties] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const { tr, language } = Translate();
  const candidate = useSelector(selectCandidate);

  const { getFaculty, getCurriculums } = CandidateAPI();

  useEffect(() => {
    const fetchFaculties = async () => {
      const facultiesRes = await getFaculty();
      facultiesRes.forEach((faculty, index) => {
        faculty.id = index;
        faculty.name = tr(faculty.name);
      });
      setFaculties(facultiesRes);
    };

    fetchFaculties();
  }, [language]);

  useEffect(() => {
    const fetchCurriculumByFaculty = async () => {
      const result = await getCurriculums();
      result.filter((curriculum) => curriculum.faculty == selectedFaculty);
      result.forEach((curriculum, index) => {
        curriculum.id = index;
        curriculum.name = tr(curriculum.name);
        curriculum.mode = tr(cleanColumns(curriculum.mode));
      });
      setCurriculumsByFaculty(result);

      if (localStorage.getItem("curriculum")) {
        const curriculumLocalStg = JSON.parse(
          localStorage.getItem("curriculum")
        );
        setSelectedCurriculum(curriculumLocalStg);
      }
    };

    const isUserInCurriculumStep = activeStep == 1;
    if (isUserInCurriculumStep) fetchCurriculumByFaculty();
  }, [selectedFaculty, activeStep, language]);

  const { curriculumColumns, facultiesColumns } = CandidateColumnConstants(
    faculties,
    curriculumsByFaculty
  );

  const titleText = useMemo(() => {
    if (activeStep == 0) {
      return tr("Choose a faculty");
    } else if (activeStep == 1) {
      return tr("Choose or create your curriculum");
    } else if (activeStep == 2) {
      return tr("Fill in your candidate details");
    } else if (activeStep == 3) {
      return tr("Verify your details");
    }
  }, [activeStep, language]);

  const disableNextBtn = useMemo(() => {
    if (activeStep == 0) {
      return selectedFaculty === "";
    } else if (activeStep === 1) {
      return selectedCurriculum === "";
    } else if (activeStep === 2) {
      return candidate.name == undefined;
    } else if (activeStep === 3) {
      return true;
    } else return true;
  }, [activeStep, selectedFaculty, selectedCurriculum, candidate]);

  return {
    activeStep,
    setActiveStep,
    curriculumsByFaculty,
    faculties,
    selectedFaculty,
    setSelectedFaculty,
    selectedCurriculum,
    setSelectedCurriculum,
    titleText,
    disableNextBtn,
    curriculumColumns,
    facultiesColumns
  };
}
