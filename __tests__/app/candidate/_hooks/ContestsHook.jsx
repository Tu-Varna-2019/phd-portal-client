import "@testing-library/jest-dom";

import { renderHook, act, waitFor } from "@testing-library/react";
import ContestsHook from "../../../../src/app/candidate/_hooks/ContestsHook.jsx";

describe("ContestsHook", () => {
  it("fetch candidate contests", async () => {
    const { result } = renderHook(() => ContestsHook());

    await act(async () => {
      await result.current.fetchContests();
      await result.current.fetchCandidatesInReview();
    });

    await waitFor(() => {
      expect(result.current.contests.length).toBeGreaterThan(0);
    });

    const { contests, candidatesInReview } = result.current;
    expect(contests[0].name).toBe("Явор Яворов");
    expect(contests[0].faculty).toBe("Software engineering");

    expect(candidatesInReview[0].name).toBe("Явор Яворов");
    expect(candidatesInReview[0].faculty).toBe("Software engineering");
  });
});
