"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/doctoralCenter/manager-expert";

export default function DoctoralCenterAPI() {
  const { route } = ClientRoute();

  const getCandidates = async () => {
    return await route({
      url: `${API_URL}/candidates`,
      method: "GET"
    });
  };

  const fetchUnauthorizedUsers = async () => {
    return await route({
      url: `${API_URL}/unauthorized-users`,
      method: "GET"
    });
  };

  return {
    getCandidates,
    fetchUnauthorizedUsers
  };
}
