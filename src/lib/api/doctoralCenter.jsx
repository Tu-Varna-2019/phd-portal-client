"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/doctoral-center/manager-expert";

export default function DoctoralCenterAPI() {
  const { route } = ClientRoute();

  const getCandidates = async (fields) => {
    return await route({
      url: `${API_URL}/candidates?fields=${fields}`,
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
