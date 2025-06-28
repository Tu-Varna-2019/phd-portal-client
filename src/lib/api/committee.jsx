"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/committee";

export default function CommitteeAPI() {
  const { route } = ClientRoute();

  const getCandidates = async (fields) => {
    return await route({
      url: `${API_URL}/chairman-member/candidates?fields=${fields}`,
      method: "GET"
    });
  };

  const getGrades = async () => {
    return await route({
      url: `${API_URL}/grades`,
      method: "GET"
    });
  };

  const getCommission = async () => {
    return await route({
      url: `${API_URL}/commission`,
      method: "GET"
    });
  };

  return {
    getCandidates,
    getGrades,
    getCommission
  };
}
