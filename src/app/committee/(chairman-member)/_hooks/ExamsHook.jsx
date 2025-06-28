import { useCallback, useEffect, useState } from "react";
import { createDataUrl } from "@/lib/helpers/utils";
import FileAPI from "@/lib/api/file";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import CommitteeAPI from "@/lib/api/committee";
import APIWrapper from "@/lib/helpers/APIWrapper";
import { useSelector } from "react-redux";
import { selectCommittee } from "@/lib/features/user/slices/userMemoSelector";

export default function ExamsHook() {
  const committee = useSelector(selectCommittee);

  const { logNotifyAlert } = APIWrapper();
  const { download } = FileAPI();
  const { language, tr } = Translate();
  const { getGrades, getCommision } = CommitteeAPI();
  const [exams, setExams] = useState();
  const [commisions, setCommisions] = useState();

  const [selectedExam, setSelectedExam] = useState({});
  const [selectedCommission, setSelectedCommission] = useState();

  const [isExamOpened, setIsExamOpened] = useState(false);
  const [isCommisionOpened, setIsCommisionOpened] = useState(false);
  const [isSetCommitteeLoading, setIsSetCommitteeLoading] = useState(false);

  const fetchExams = useCallback(async () => {
    const examsResponse = await getGrades();
    examsResponse.forEach((exam) => {
      exam.subject = tr(exam.subject);
    });

    setExams(examsResponse);
  }, [language]);

  const fetchCommisions = useCallback(async () => {
    const commisionsResponse = await getCommision();

    commisionsResponse.forEach((commision, index) => {
      commision.id = index;
    });
    setCommisions(commisionsResponse);
  }, [language]);

  useEffect(() => {
    fetchExams();
    fetchCommisions();
    return runPeriodically(() => {
      fetchExams();
      fetchCommisions();
    });
  }, [fetchExams, fetchCommisions]);

  const openGradeAttachmentOnClick = async (attachment) => {
    const blobData = await download(`grades/${attachment}`);

    const dataUrl = await createDataUrl({
      file: blobData,
      fileType: "blob"
    });
    window.open(dataUrl, "_blank", "noopener,noreferrer");
  };

  const showCommisionPageOnClick = () => {
    setIsCommisionOpened(true);
  };

  return {
    exams,
    commisions,
    openGradeAttachmentOnClick,
    setCommisionOnClick,
    onApproveCandidatePhdClick,
    onRejectCandidatePhdClick,
    selectedExam,
    setSelectedExam,
    selectedCommission,
    isExamOpened,
    setIsExamOpened,
    isCommisionOpened,
    isSetCommitteeLoading,
    setIsCommisionOpened,
    setSelectedCommission,
    showCommisionPageOnClick
  };
}
