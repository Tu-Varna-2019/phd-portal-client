import { useCallback, useEffect, useState } from "react";
import { cleanColumns, runPeriodically } from "@/lib/helpers/utils";
import CandidateAPI from "@/api/CandidateAPI";
import Translate from "@/lib/helpers/Translate";
import { useAppDispatch } from "@/lib/features/constants";

export default function HomeHook() {
  const dispatch = useAppDispatch();
  const { tr, language } = Translate();

  const [curriculums, setCurriculums] = useState([]);
  const { getCurriculums } = CandidateAPI();

  const fetchCurriculums = useCallback(async () => {
    const curriculumsResponse = await getCurriculums();

    if (curriculumsResponse.status == "error") {
      dispatch(
        setAlertBox({
          message: tr("Error in retrieving curriculums"),
          level: "error"
        })
      );
    } else {
      curriculumsResponse.forEach((curriculum, index) => {
        curriculum.id = index;
        curriculum.name = tr(curriculum.name);

        let mode = tr(curriculum.mode);
        mode = cleanColumns(mode);

        curriculum.mode = mode;
        curriculum.faculty = tr(curriculum.faculty);
      });

      setCurriculums(curriculumsResponse);
    }
  }, [language]);

  useEffect(() => {
    fetchCurriculums();
    return runPeriodically(() => {
      fetchCurriculums();
    });
  }, [fetchCurriculums]);

  return {
    curriculums
  };
}
