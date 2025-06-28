"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/committee";

export default function CommitteeAPI() {
  const { route } = ClientRoute();

  const getCandidates = async (fields) => {
    return await route({
      url: `${API_URL}/candidates?fields=${fields}`,
      method: "GET"
    });
  };

  return {
    getCandidates
  };
}
