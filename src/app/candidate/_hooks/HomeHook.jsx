import { useCallback, useEffect, useState } from "react";
import { runPeriodically } from "@/lib/helpers/utils";
import CandidateAPI from "@/lib/api/candidate";

export default function HomeHook() {
  const [curriculums, setCurriculums] = useState([]);
  const { getCurriculums } = CandidateAPI();

  const fetchCurriculums = useCallback(async () => {
    const curriculumsResponse = await getCurriculums();
    setCurriculums(curriculumsResponse);
  }, []);

  useEffect(() => {
    fetchCurriculums();
    return runPeriodically(() => {
      fetchCurriculums();
    });
  }, [curriculums]);

  return {
    curriculums
  };
}
