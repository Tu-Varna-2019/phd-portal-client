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

  const getSubjects = async () => {
    return await route({
      url: `${API_URL}/subjects`,
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

  return {
    getCurriculums,
    getSubjects,
    getContests,
    getCandidatesInReview
  };
}
