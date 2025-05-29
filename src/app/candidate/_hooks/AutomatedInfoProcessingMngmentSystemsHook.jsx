import { useEffect, useState } from "react";
import CandidateAPI from "@/lib/api/candidate";
import Translate from "@/lib/helpers/Translate";

export default function AutomatedInfoProcessingMngmentSystemsHook() {
  const [subjects, setSubjects] = useState([]);
  const { getSubjectsByCurriculumName } = CandidateAPI();
  const { tr, language } = Translate();

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsRes = await getSubjectsByCurriculumName(
        "Automated information processing and management systems"
      );

      if (subjectsRes != []) {
        subjectsRes.forEach((subject, index) => {
          subject.id = index;
          subject.name = tr(subject.name);
        });
        setSubjects(subjectsRes);
      }
    };
    fetchSubjects();
  }, [language]);

  return {
    subjects
  };
}
