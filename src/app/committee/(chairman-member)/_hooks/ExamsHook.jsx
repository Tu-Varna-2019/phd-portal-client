import { useCallback, useEffect, useState } from "react";
import { createDataUrl } from "@/lib/helpers/utils";
import FileAPI from "@/lib/api/file";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import CommitteeAPI from "@/lib/api/committee";
import { useSelector } from "react-redux";
import { selectCommittee } from "@/lib/features/user/slices/userMemoSelector";
import APIWrapper from "@/lib/helpers/APIWrapper";

export default function ExamsHook() {
  const { language, tr } = Translate();
  const grades = [2, 3, 4, 5, 6];

  const { logNotifyAlert } = APIWrapper();
  const { getGrades, evaluateGrade } = CommitteeAPI();
  const { download } = FileAPI();

  const [exams, setExams] = useState([]);
  const [gradeOption, setGradeOption] = useState();

  const [isSignedCommitteeEvalGrade, setIsSignedCommitteeEvalGrade] =
    useState(false);
  const signedCommittee = useSelector(selectCommittee);
  const [selectedExam, setSelectedExam] = useState({});
  const [isExamOpened, setIsExamOpened] = useState(false);

  const fetchExams = useCallback(async () => {
    const examsResponse = await getGrades();
    examsResponse.forEach((exam, index) => {
      exam.id = index;
      exam.subject = tr(exam.subject);

      exam.commission.committees.forEach((committee, index) => {
        committee.id = index;
        committee.role = tr(committee.role);

        // NOTE: Check if the signed committee signed a grade or not
        if (signedCommittee.oid == committee.oid && committee.grade != null) {
          setIsSignedCommitteeEvalGrade(true);
        }
      });
    });

    setExams(examsResponse);
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
    await evaluateGrade(
      selectedExam.evaluatedUser.group,
      parseFloat(gradeOption),
      tr(selectedExam.subject, "en"),
      selectedExam.evaluatedUser.pin
    );

    logNotifyAlert({
      title:
        `Член от комитета: ${signedCommittee.name} оцени студнет: ` +
        selectedExam.evaluatedUser.name +
        " с оценка: " +
        gradeOption,
      description:
        `Член от комитета: ${signedCommittee.name} оцени студнет: ` +
        selectedExam.evaluatedUser.name +
        " с оценка: " +
        gradeOption,
      message:
        tr("You have successfull evaluated") +
        " " +
        tr(selectedExam.evaluatedUser.group) +
        " " +
        tr("to grade") +
        " " +
        gradeOption,
      action: `Потребителят ${signedCommittee.name} е оценил студент с ЕГН: ${selectedExam.evaluatedUser.pin} с оценка ${gradeOption}`,
      level: "success",
      scope: "group",
      group: "committee"
    });
  };

  const onEvaluateGradeChange = async (value) => {
    setGradeOption(value);
  };

  return {
    exams,
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
