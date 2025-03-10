import CandidateAPI from "@/lib/api/candidate";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function ContestsHook() {
  const [contests, setContests] = useState([]);
  const [selectedContestYear, setSelectedYearContest] = useState();
  const { getContests } = CandidateAPI();

  const fetchContests = useCallback(async () => {
    const contestsRes = await getContests();
    contestsRes.forEach((contest, index) => {
      contest.id = index;
      return contest;
    });
    contestsRes.sort(
      (prev, current) => prev.yearAccepted < current.yearAccepted
    );

    setContests(contestsRes);
    setSelectedYearContest(contestsRes[0].yearAccepted);
  }, []);

  useEffect(() => {
    // NOTE: Don't need to retrieve the contests every N number of seconds
    fetchContests();
  }, [fetchContests]);

  const contestYears = useMemo(() => {
    return Array.from(new Set(contests.map((contest) => contest.yearAccepted)));
  }, [contests]);

  const contestCandidatesByYear = useMemo(() => {
    return contests.filter(
      (contest) => contest.yearAccepted == selectedContestYear
    );
  }, [contests, selectedContestYear]);

  return {
    contestYears,
    contestCandidatesByYear
  };
}
