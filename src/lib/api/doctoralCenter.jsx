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

  const getUnauthorizedUsers = async () => {
    return await route({
      url: `${API_URL}/unauthorized-users`,
      method: "GET"
    });
  };

  const setUnauthorizedUserGroup = async (unauthUsers, group) => {
    return await route({
      url: `${API_URL}/unauthorized-users/group?group=${group}`,
      method: "POST",
      body: unauthUsers
    });
  };

  const getDocCenterRoles = async () => {
    return await route({
      url: `${API_URL}/roles`,
      method: "GET"
    });
  };

  return {
    getCandidates,
    getUnauthorizedUsers,
    setUnauthorizedUserGroup,
    getDocCenterRoles
  };
}
