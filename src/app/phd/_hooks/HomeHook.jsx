import { selectPhd } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import { HomeConstants } from "../_constants/HomeConstants";
import PhdAPI from "@/lib/api/PhdAPI";
import APIWrapper from "@/lib/helpers/APIWrapper";

export default function HomeHook() {
  const phd = useSelector(selectPhd);
  const { tr, language } = Translate();
  const { getGrades } = PhdAPI();
  const { logAlert } = APIWrapper();

  const { examLabelStuct, examPieChartStruct } = HomeConstants();
  const [exams, setExams] = useState([]);

  const fetchGrades = useCallback(async () => {
    const examResponse = await getGrades();

    if (examResponse.status == "error") {
      logAlert({
        message: tr(examResponse.message),
        description: "Проблем при извличането на изпитите",
        action: "Проблем при извличането на изпитите",
        level: "error"
      });
    } else {
      setExams(examResponse);
    }
  }, [language]);

  useEffect(() => {
    fetchGrades();
    return runPeriodically(() => {
      fetchGrades();
    });
  }, [fetchGrades]);

  const examTotal = useMemo(() => {
    return exams.length;
  }, [exams]);

  const getChartGrades = useCallback(
    (examsStruct, pieChartKeyName) => {
      Object.entries(examsStruct).map(([_, value], index) => {
        examsStruct[index].value = exams.reduce((prev, currentValue) => {
          if (currentValue.grade == tr(value[pieChartKeyName], "en")) prev++;
          return prev;
        }, 0);
      });
      return examsStruct;
    },
    [exams]
  );

  const examsPieChartLabel = useMemo(() => {
    return getChartGrades(examLabelStuct, "name");
  }, [exams]);

  const examsPieChart = useMemo(() => {
    return getChartGrades(examPieChartStruct, "label");
  }, [exams]);

  return {
    name: phd.name,
    examTotal,
    examsPieChart,
    examsPieChartLabel
  };
}
