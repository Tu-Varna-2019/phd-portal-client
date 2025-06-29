import { useCallback, useEffect, useState } from "react";
import { createDataUrl } from "@/lib/helpers/utils";
import FileAPI from "@/lib/api/file";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import CommitteeAPI from "@/lib/api/committee";

export default function ExamsHook() {
  const { download } = FileAPI();
  const { language, tr } = Translate();
  const { getGrades } = CommitteeAPI();

  const [exams, setExams] = useState([]);
  const [committees, setCommittees] = useState([]);

  const [selectedExam, setSelectedExam] = useState({});
  const [isExamOpened, setIsExamOpened] = useState(false);

  const fetchExams = useCallback(async () => {
    const committeesArr = [];
    const examsResponse = await getGrades();
    examsResponse.forEach((exam, index) => {
      exam.id = index;
      exam.subject = tr(exam.subject);
      exam.commission.committees.forEach((committee, index) => {
        committeesArr.push({
          id: index,
          name: committee.name,
          grade: committee.grade == null ? 0 : committee.grade,
          role: tr(committee.role)
        });
      });
    });

    setExams(examsResponse);
    setCommittees(committeesArr);
  }, [language]);

  useEffect(() => {
    fetchExams();
    return runPeriodically(() => {
      fetchExams();
    });
  }, [fetchExams]);

  const openGradeAttachmentOnClick = async (attachment) => {
    const blobData = await download(`grades/${attachment}`);

    const dataUrl = await createDataUrl({
      file: blobData,
      fileType: "blob"
    });
    window.open(dataUrl, "_blank", "noopener,noreferrer");
  };

  return {
    exams,
    committees,
    openGradeAttachmentOnClick,
    selectedExam,
    setSelectedExam,
    isExamOpened,
    setIsExamOpened
  };
}
