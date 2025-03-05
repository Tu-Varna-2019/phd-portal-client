"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/candidate";

export default function CandidateAPI() {
  const { route } = ClientRoute();

  const getCurriculums = async () => {
    return await route({
      url: `${API_URL}/curriculum`,
      method: "GET",
      accessTokenProvided: ""
    }).then((res) => res.data);
  };

  return {
    getCurriculums
  };
}
