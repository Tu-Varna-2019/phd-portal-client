import { useCallback, useEffect, useState } from "react";
import { createDataUrl } from "@/lib/helpers/utils";
import FileAPI from "@/lib/api/file";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import CommitteeAPI from "@/lib/api/committee";
import { useSelector } from "react-redux";
import { selectCommittee } from "@/lib/features/user/slices/userMemoSelector";

export default function ExamsHook() {
  const grades = [2, 3, 4, 5, 6];

  const { download } = FileAPI();
  const { language, tr } = Translate();
  const { getGrades } = CommitteeAPI();

  const [exams, setExams] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [gradeOption, setGradeOption] = useState();

  const [isSignedCommitteeEvalGrade, setIsSignedCommitteeEvalGrade] =
    useState(false);
  const signedCommittee = useSelector(selectCommittee);
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

        // NOTE: Check if the signed committee signed a grade or not
        if (signedCommittee.oid == committee && signedCommittee.grade != null) {
          setIsSignedCommitteeEvalGrade(true);
        }
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

  const onEvaluateExamOnClick = async () => {
    console.log("test");
  };

  const onEvaluateGradeChange = async (index, _) => {
    setGradeOption(grades[index]);
  };

  return {
    exams,
    committees,
    isSignedCommitteeEvalGrade,
    openGradeAttachmentOnClick,
    selectedExam,
    setSelectedExam,
    isExamOpened,
    setIsExamOpened,
    gradeOption,
    onEvaluateExamOnClick,
    onEvaluateGradeChange,
    grades
  };
}
