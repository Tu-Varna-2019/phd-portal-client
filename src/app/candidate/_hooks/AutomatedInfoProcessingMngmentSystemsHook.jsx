import { useEffect, useState } from "react";
import CandidateAPI from "@/api/CandidateAPI";
import Translate from "@/lib/helpers/Translate";
import { useAppDispatch } from "@/lib/features/constants";
import { setAlertBox } from "@/lib/features/uiState/slices/uiStateSlice";

export default function AutomatedInfoProcessingMngmentSystemsHook() {
  const dispatch = useAppDispatch();
  const { tr, language } = Translate();

  const [subjects, setSubjects] = useState([]);
  const { getSubjectsByCurriculumName } = CandidateAPI();

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsRes = await getSubjectsByCurriculumName(
        "Automated information processing and management systems"
      );

      if (subjectsRes.status == "error") {
        dispatch(
          setAlertBox({
            message: tr("Error in retrieving faculties"),
            level: "error"
          })
        );
      } else {
        subjectsRes.forEach((subject, index) => {
          subject.id = index;
          subject.name = tr(subject.name);
        });
        setSubjects(subjectsRes);
      }
      fetchSubjects();
    };
  }, [language]);

  return {
    subjects
  };
}
