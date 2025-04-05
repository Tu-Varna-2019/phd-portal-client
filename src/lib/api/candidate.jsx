"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/candidate";

export default function CandidateAPI() {
  const { route } = ClientRoute();

  const getCurriculums = async () => {
    return await route({
      url: `${API_URL}/curriculums`,
      method: "GET",
      accessTokenProvided: ""
    });
  };

  const getSubjectsByCurriculumName = async (curriculum) => {
    return await route({
      url: `${API_URL}/subjects/queryParam/curriculum?curriculumName=${curriculum}`,
      method: "GET",
      accessTokenProvided: ""
    });
  };

  const getSubjectsByFacultyName = async (faculty) => {
    return await route({
      url: `${API_URL}/subjects/queryParam/faculty?facultyName=${faculty}`,
      method: "GET",
      accessTokenProvided: ""
    });
  };

  const getContests = async () => {
    return await route({
      url: `${API_URL}/contests`,
      method: "GET",
      accessTokenProvided: ""
    });
  };

  const getCandidatesInReview = async () => {
    return await route({
      url: `${API_URL}/in-review`,
      method: "GET",
      accessTokenProvided: ""
    });
  };

  const getFaculty = async () => {
    return await route({
      url: `${API_URL}/faculty`,
      method: "GET",
      accessTokenProvided: ""
    });
  };

  return {
    getCurriculums,
    getSubjectsByFacultyName,
    getSubjectsByCurriculumName,
    getContests,
    getCandidatesInReview,
    getFaculty
  };
}
