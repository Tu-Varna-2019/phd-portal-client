"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/doctoralCenter/admin";
// TODO: maybe move the logs api to the doo center admin api route
const API_BASE_URL = "/api";

export default function DoctoralCenterAdminAPI() {
  const { route } = ClientRoute();

  const fetchAutorizedUsers = async () => {
    return await route({ url: `${API_URL}/authorized-users`, method: "GET" });
  };

  const fetchUnauthorizedUsers = async () => {
    return await route({
      url: `${API_URL}/unauthorized-users`,
      method: "GET"
    });
  };

  const getLogs = async () => {
    return await route({ url: `${API_BASE_URL}/logs`, method: "GET" });
  };

  const setUnauthorizedUserRoles = async (unauthUsers, roleOption) => {
    return await route({
      url: `${API_URL}/unauthorized-users/role?role=${roleOption}`,
      method: "POST",
      body: unauthUsers
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
    fetchAutorizedUsers,
    fetchUnauthorizedUsers,
    setUnauthorizedUserRoles,
    deleteAuthorizedUser,
    getLogs
  };
}
