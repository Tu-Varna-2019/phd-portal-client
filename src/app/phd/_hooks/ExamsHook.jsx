import { useCallback, useEffect, useState } from "react";
import { createDataUrl } from "@/lib/helpers/utils";
import FileAPI from "@/api/FileAPI";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import APIWrapper from "@/lib/helpers/APIWrapper";
import PhdAPI from "@/lib/api/PhdAPI";

export default function ExamsHook() {
  const { language, tr } = Translate();
  const { logAlert } = APIWrapper();

  const { getGrades, setAttachmentsToGrade } = PhdAPI();
  const { download } = FileAPI();

  const [exams, setExams] = useState([]);

  const [selectedExam, setSelectedExam] = useState({});
  const [isExamOpened, setIsExamOpened] = useState(false);
  const [isAttachmentBtnClicked, setIsAttachmentBtnClicked] = useState(false);

  const fetchExams = useCallback(async () => {
    const examsResponse = await getGrades();

    if (examsResponse.status == "error") {
      logAlert({
        message: tr(examsResponse.message),
        description: "Проблем при извличането на изпити",
        action: "Проблем при извличането на изпити",
        level: "error"
      });
    } else {
      examsResponse.forEach((exam, index) => {
        exam.id = index;
        exam.subject = tr(exam.subject);

        if (exam.commission != null) {
          exam.commission.committees.forEach((committee, index) => {
            committee.id = index;
            committee.role = tr(committee.role);
          });
        }
      });
      setExams(examsResponse);
    }
  }, [language]);

  useEffect(() => {
    fetchExams();
    return runPeriodically(() => {
      fetchExams();
    });
  }, [fetchExams]);

  const openGradeAttachmentOnClick = async (attachment) => {
    const blobData = await download(`grades/${attachment}`);

    if (blobData.status == "success") {
      const dataUrl = await createDataUrl({
        file: blobData,
        fileType: "blob"
      });
      window.open(dataUrl, "_blank", "noopener,noreferrer");
    } else {
      logAlert({
        message: tr(blobData.message),
        description: "Проблем при изтеглянето на файла",
        action: "Проблем при изтеглянето на файла",
        level: "error"
      });
    }
  };

  const uploadAttachment = async (event) => {
    setIsAttachmentBtnClicked(true);

    const fileBytes = event.target.files[0];
    const { name, type } = fileBytes;

    const formData = new FormData();
    formData.append("data", fileBytes);
    formData.append("filename", name);
    formData.append("mimetype", type);

    const result = await upload(formData, "grades");
    if (result.status == "success") {
      await setAttachmentsToGrade();
      logAlert({
        message: tr("You have successfully uploaded attachment!"),
        description:
          "Потребителят си добави прикачен файл към оценка: " +
          selectedExam.gradeId,
        action:
          "Потребител качи прикачен файл към оценка: " + selectedExam.gradeId,
        level: "success"
      });
    } else {
      dispatch(
        setAlertBox({
          message: tr(result.message),
          severity: "error"
        })
      );
    }

    setIsAttachmentBtnClicked(false);
  };

  return {
    exams,
    openGradeAttachmentOnClick,
    selectedExam,
    setSelectedExam,
    isExamOpened,
    setIsExamOpened,
    isAttachmentBtnClicked,
    uploadAttachment
  };
}
