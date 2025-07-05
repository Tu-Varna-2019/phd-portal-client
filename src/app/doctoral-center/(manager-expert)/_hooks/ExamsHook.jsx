import { useCallback, useEffect, useState } from "react";
import { createDataUrl } from "@/lib/helpers/utils";
import FileAPI from "@/api/FileAPI";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import DoctoralCenterAPI from "@/api/DoctoralCenterAPI";
import APIWrapper from "@/lib/helpers/APIWrapper";
import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/lib/features/user/slices/userMemoSelector";

export default function ExamsHook() {
  const doctoralCenter = useSelector(selectDoctoralCenter);

  const { setCommissionOnGrade } = DoctoralCenterAPI();
  const { logNotifyAlert } = APIWrapper();
  const { download } = FileAPI();
  const { language, tr } = Translate();
  const { getGrades, getCommissions } = DoctoralCenterAPI();
  const [exams, setExams] = useState();
  const [commissions, setCommissions] = useState();

  const [selectedExam, setSelectedExam] = useState({});
  const [selectedCommission, setSelectedCommission] = useState();

  const [isExamOpened, setIsExamOpened] = useState(false);
  const [isCommissionOpened, setIsCommissionOpened] = useState(false);
  const [isModifyCommissionOpened, setIsModifyCommissionOpened] =
    useState(false);

  const [isSetCommitteeLoading, setIsSetCommitteeLoading] = useState(false);

  const fetchExams = useCallback(async () => {
    const examsResponse = await getGrades();
    examsResponse.forEach((exam, index) => {
      exam.id = index;
      exam.subject = tr(exam.subject);
    });

    setExams(examsResponse);
  }, [language]);

  const fetchCommissions = useCallback(async () => {
    const commissionsResponse = await getCommissions();

    commissionsResponse.forEach((commission, index) => {
      commission.id = index;
    });
    setCommissions(commissionsResponse);
  }, [language]);

  useEffect(() => {
    fetchExams();
    fetchCommissions();
    return runPeriodically(() => {
      fetchExams();
      fetchCommissions();
    });
  }, [fetchExams, fetchCommissions]);

  const openGradeAttachmentOnClick = async (attachment) => {
    const blobData = await download(`grades/${attachment}`);

    const dataUrl = await createDataUrl({
      file: blobData,
      fileType: "blob"
    });
    window.open(dataUrl, "_blank", "noopener,noreferrer");
  };

  const setCommissionOnClick = async () => {
    setIsSetCommitteeLoading(true);
    const id = selectedExam.gradeId;
    const name = selectedCommission.name;

    const result = await setCommissionOnGrade(id, name);
    if (result != []) {
      logNotifyAlert({
        title: `Член на докторантски център ${doctoralCenter.name} зададе комитет: ${name} към оценка с id: ${id}`,
        description: `Член на докторантски център ${doctoralCenter.name} зададе комитет: ${name} към оценка с id: ${id}`,
        message: `Успешно зададохте комитет: ${name} към оценка с id: ${id}`,
        action: `Член на докторантски център ${doctoralCenter.name} зададе комитет: ${name} към оценка с id: ${id}`,
        level: "success",
        scope: "group",
        group: "expert-manager"
      });
    } else {
      console.error("Error in setting commission to grade: " + id);
      logAlert({
        message: tr("Проблем, моля пробвайте по-късно"),
        description: "Проблем, моля пробвайте по-късно",
        action: "Проблем, моля пробвайте по-късно",
        level: "error"
      });
    }

    setIsSetCommitteeLoading(true);
  };

  const setModifyCommissionOnClick = async () => {
    setIsSetCommitteeLoading(true);
    const id = selectedExam.gradeId;
    const name = selectedCommission.name;

    const result = await setCommissionOnGrade(id, name);
    if (result != []) {
      logNotifyAlert({
        title: `Член на докторантски център ${doctoralCenter.name} промени комитет: ${name} към оценка с id: ${id}`,
        description: `Член на докторантски център ${doctoralCenter.name} промени комитет: ${name} към оценка с id: ${id}`,
        message: `Успешно зададохте комитет: ${name} към оценка с id: ${id}`,
        action: `Член на докторантски център ${doctoralCenter.name} промени комитет: ${name} към оценка с id: ${id}`,
        level: "success",
        scope: "group",
        group: "expert-manager"
      });
    } else {
      console.error("Error in setting commission to grade: " + id);
      logAlert({
        message: tr("Проблем, моля пробвайте по-късно"),
        description: "Проблем, моля пробвайте по-късно",
        action: "Проблем, моля пробвайте по-късно",
        level: "error"
      });
    }

    setIsSetCommitteeLoading(true);
  };

  const showCommissionPageOnClick = () => {
    setIsCommissionOpened(true);
  };

  const showModifyCommissionPageOnClick = () => {
    setIsModifyCommissionOpened(true);
  };

  return {
    exams,
    commissions,
    openGradeAttachmentOnClick,
    setCommissionOnClick,
    selectedExam,
    setSelectedExam,
    selectedCommission,
    isExamOpened,
    setIsExamOpened,
    isCommissionOpened,
    isModifyCommissionOpened,
    isSetCommitteeLoading,
    setIsCommissionOpened,
    setIsModifyCommissionOpened,
    setSelectedCommission,
    showCommissionPageOnClick,
    showModifyCommissionPageOnClick,
    setModifyCommissionOnClick
  };
}
