import "@testing-library/jest-dom";

import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ApplyHook from "../../../../src/app/candidate/_hooks/ApplyHook.jsx";

const mockStore = configureStore([]);
const store = mockStore({
  user: {
    phd: {
      // mocked phd slice state
    },
    committee: {
      // mocked committee slice state
    },
    doctoralCenter: {
      // mocked doctoralCenter slice state
    },
    candidate: {
      // mocked candidate slice state if needed
    }
  },
  sessionToken: {
    // mock session token slice
  }
});

describe("ApplyHook", () => {
  it("fetch faculties and curriculums", async () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => ApplyHook(), { wrapper });

    await act(async () => {
      await result.current.fetchFaculties();
      await result.current.fetchCurriculumByFaculty();
    });

    const { faculties, curriculumsByFaculty } = result.current;

    expect(faculties[0].name).toBe("Software engineering");
    expect(faculties[1].name).toBe("Artificial inteligence");
    expect(faculties[2].name).toBe("Cybersecurity");

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
    expect(curriculumsByFaculty[1].mode).toBe("part time");
    expect(curriculumsByFaculty[1].yearPeriod).toBe("4");
    expect(curriculumsByFaculty[1].faculty).toBe("Software engineering");
    expect(curriculumsByFaculty[1].subjects.length).toBe(12);
  });
});
