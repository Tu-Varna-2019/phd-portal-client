import { useCallback, useEffect, useState } from "react";
import { runPeriodically, setArrayIds } from "@/lib/helpers/utils";
import CandidateAPI from "@/lib/api/candidate";

export default function HomeHook() {
  const [curriculums, setCurriculums] = useState([]);
  const { getCurriculums } = CandidateAPI();

  const fetchCurriculums = useCallback(async () => {
    const curriculumsResponse = await getCurriculums();
    const curriculumsWithIds = setArrayIds(curriculumsResponse);

    setCurriculums(curriculumsWithIds);
  }, []);

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
