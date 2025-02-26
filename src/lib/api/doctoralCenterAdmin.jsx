"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/doctoralCenter/admin";
// TODO: maybe move the logs api to the doo center admin api route
const API_BASE_URL = "/api";

export default function DoctoralCenterAdminAPI() {
  const { route } = ClientRoute();

  const getAuthorizedUsers = async () => {
    return await route({ url: `${API_URL}/authorized-users`, method: "GET" });
  };

  const getUnauthorizedUsers = async () => {
    return await route({
      url: `${API_URL}/unauthorized-users`,
      method: "GET"
    });
  };

  const getLogs = async () => {
    return await route({ url: `${API_BASE_URL}/logs`, method: "GET" });
  };

  const setUnauthorizedUserGroup = async (unauthUsers, group) => {
    return await route({
      url: `${API_URL}/unauthorized-users/group?group=${group}`,
      method: "POST",
      body: unauthUsers
    });
  };

  const setUnauthorizedUserIsAllowed = async (oid, isAllowed) => {
    return await route({
      url: `${API_URL}/unauthorized-users/is-allowed?isAllowed=${isAllowed}`,
      method: "PATCH",
      body: { oid: oid }
    });
  };

  const deleteAuthorizedUser = async (oid, role) => {
    // TODO: Improve this pls
    let reqRole = role;
    if (role == "manager" || role == "expert" || role == "admin")
      reqRole = "doctoralCenter";

    return await route({
      url: `${API_URL}/authorized-users?oid=${oid}`,
      method: "DELETE",
      body: {
        role: reqRole
      }
    });
  };

  return {
    getAuthorizedUsers,
    getUnauthorizedUsers,
    setUnauthorizedUserGroup,
    deleteAuthorizedUser,
    getLogs,
    setUnauthorizedUserIsAllowed
  };
}
