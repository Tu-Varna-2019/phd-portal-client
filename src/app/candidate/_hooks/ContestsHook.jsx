import CandidateAPI from "@/api/CandidateAPI";
import { useAppDispatch } from "@/lib/features/constants";
import { setAlertBox } from "@/lib/features/uiState/slices/uiStateSlice";
import Translate from "@/lib/helpers/Translate";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function ContestsHook() {
  const dispatch = useAppDispatch();
  const { tr } = Translate();

  const [contests, setContests] = useState([]);
  const [selectedContestYear, setSelectedYearContest] = useState();
  const [candidatesInReview, setCandidatesInReview] = useState();
  const { getContests, getCandidatesInReview } = CandidateAPI();

  const fetchContests = useCallback(async () => {
    const contestsRes = await getContests();

    if (contestsRes.status == "error") {
      dispatch(
        setAlertBox({
          message: tr("Error in retrieving contests"),
          level: "error"
        })
      );
    } else {
      contestsRes.forEach((contest, index) => {
        contest.id = index;
        contest.faculty = tr(contest.faculty);
        return contest;
      });
      contestsRes.sort(
        (prev, current) => prev.yearAccepted < current.yearAccepted
      );

      setContests(contestsRes);
      if (contestsRes.length > 0)
        setSelectedYearContest(contestsRes[0].yearAccepted);
    }
  }, []);

  const fetchCandidatesInReview = useCallback(async () => {
    const candidatesInReviewRes = await getCandidatesInReview();

    if (candidatesInReviewRes.status == "error") {
      dispatch(
        setAlertBox({
          message: tr("Error in retrieving candidates in review"),
          level: "error"
        })
      );
    } else {
      candidatesInReviewRes.forEach((candidate, index) => {
        candidate.id = index;
        candidate.faculty = tr(candidate.faculty);
        return candidate;
      });
      setCandidatesInReview(candidatesInReviewRes);
    }
  }, []);

  useEffect(() => {
    // NOTE: Don't need to retrieve the contests every N number of seconds
    fetchContests();
    fetchCandidatesInReview();
  }, [fetchContests, fetchCandidatesInReview]);

  const contestYears = useMemo(() => {
    return Array.from(new Set(contests.map((contest) => contest.yearAccepted)));
  }, [contests]);

  const selectedCandidatesByYear = useMemo(() => {
    return contests.filter(
      (contest) => contest.yearAccepted == selectedContestYear
    );
  }, [contests, selectedContestYear]);

  return {
    contests,
    candidatesInReview,
    contestYears,
    selectedCandidatesByYear,
    setSelectedYearContest,
    fetchContests,
    fetchCandidatesInReview
  };
}
