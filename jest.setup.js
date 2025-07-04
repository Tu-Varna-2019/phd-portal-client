jest.mock("react-i18next");

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      replace: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    };
  },

  usePathname() {
    return "/";
  }
}));

jest.mock("@/api/CandidateAPI", () => {
  const getContests = jest.fn(() =>
    Promise.resolve([
      {
        name: "Явор Яворов",
        faculty: "Software engineering",
        yearAccepted: 2024
      }
    ])
  );

  const getCandidatesInReview = jest.fn(() =>
    Promise.resolve([
      {
        name: "Явор Яворов",
        faculty: "Software engineering"
      }
    ])
  );

  const getFaculty = jest.fn(() =>
    Promise.resolve([
      {
        name: "Software engineering"
      },
      {
        name: "Artificial inteligence"
      },
      {
        name: "Cybersecurity"
      }
    ])
  );

  const getCurriculums = jest.fn(() =>
    Promise.resolve([
      {
        name: "Automated information processing and management systems",
        mode: "regular",
        yearPeriod: "3",
        faculty: "Software engineering",
        subjects: [
          "Bioinformatics",
          "Programming in Mathlab/ C#/ Java/ Python or other language",
          "Programming technologies on the Internet",
          "Modern Software Technologies",
          "Methods of Research and Development of dissertation",
          "English",
          "Machine learning",
          "Multimedia systems and technologies",
          "Processing of visual information",
          "Block C (PhD minimum)",
          "Cryptography and data protection",
          "Databases and Information Technology"
        ]
      },
      {
        name: "Automated information processing and management systems",
        mode: "part_time",
        yearPeriod: "4",
        faculty: "Software engineering",
        subjects: [
          "Bioinformatics",
          "Programming in Mathlab/ C#/ Java/ Python or other language",
          "Programming technologies on the Internet",
          "Modern Software Technologies",
          "Methods of Research and Development of dissertation",
          "English",
          "Machine learning",
          "Multimedia systems and technologies",
          "Processing of visual information",
          "Block C (PhD minimum)",
          "Cryptography and data protection",
          "Databases and Information Technology"
        ]
      }
    ])
  );

  return {
    __esModule: true,
    default: () => ({
      getContests,
      getCandidatesInReview,
      getFaculty,
      getCurriculums
    })
  };
});
