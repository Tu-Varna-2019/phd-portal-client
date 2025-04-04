"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/doctoral-center/admin";
// TODO: maybe move the logs api to the doo center admin api route
const API_BASE_URL = "/api";

export default function DoctoralCenterAdminAPI() {
  const { route } = ClientRoute();

  const getAuthorizedUsers = async () => {
    return await route({ url: `${API_URL}/authorized`, method: "GET" });
  };

  const getUnauthorizedUsers = async () => {
    return await route({
      url: `${API_URL}/unauthorized`,
      method: "GET"
    });
  };

  const getLogs = async () => {
    return await route({ url: `${API_BASE_URL}/logs`, method: "GET" });
  };

  const setUnauthorizedUserGroup = async (unauthUsers, group) => {
    return await route({
      url: `${API_URL}/unauthorized/group?group=${group}`,
      method: "POST",
      body: unauthUsers
    });
  };

  const setUnauthorizedUserIsAllowed = async (oid, isAllowed) => {
    return await route({
      url: `${API_URL}/unauthorized/is-allowed?oid=${oid}&isAllowed=${isAllowed}`,
      method: "PATCH"
    });
  };

  const deleteAuthorizedUser = async (oid, group) => {
    if (group == "manager" || group == "expert" || group == "admin")
      group = "doctoral-center";

    return await route({
      url: `${API_URL}/authorized?oid=${oid}&group=${group}`,
      method: "DELETE"
    });
  };

  const getDocCenterRoles = async () => {
    return await route({
      url: `${API_URL}/roles`,
      method: "GET"
    });
  };

  return {
    getAuthorizedUsers,
    getUnauthorizedUsers,
    setUnauthorizedUserGroup,
    deleteAuthorizedUser,
    getLogs,
    setUnauthorizedUserIsAllowed,
    getDocCenterRoles
  };
}
