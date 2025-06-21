import "@testing-library/jest-dom";

import { renderHook, act } from "@testing-library/react";
import ApplyHook from "../../../../src/app/candidate/_hooks/ApplyHook.jsx";

describe("ApplyHook", () => {
  it("fetch faculties and curriculums", async () => {
    const { result } = renderHook(() => ApplyHook());

    await act(async () => {
      await result.current.fetchFaculties();
      await result.current.fetchCandidatesInReview();
    });

    const { faculties, curriculumsByFaculty } = result.current;

    expect(faculties[0].name).toBe("Software engineering");
    expect(faculties[0].name).toBe("Artificial inteligence");
    expect(faculties[0].name).toBe("Cybersecurity");

    expect(curriculumsByFaculty[0].name).toBe(
      "Automated information processing and management systems"
    );
    expect(curriculumsByFaculty[0].mode).toBe("regular");
    expect(curriculumsByFaculty[0].yearPeriod).toBe("3");
    expect(curriculumsByFaculty[0].faculty).toBe("Software engineering");
    expect(curriculumsByFaculty[0].subjects.length).toBe(12);

    expect(curriculumsByFaculty[1].name).toBe(
      "Automated information processing and management systems"
    );
    expect(curriculumsByFaculty[0].mode).toBe("part_time");
    expect(curriculumsByFaculty[0].yearPeriod).toBe("4");
    expect(curriculumsByFaculty[0].faculty).toBe("Software engineering");
    expect(curriculumsByFaculty[0].subjects.length).toBe(12);
  });
});
