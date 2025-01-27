"use client";
import ClientRoute from "./router/client";

const API_URL = "/api/doctoralCenter/admin";
const API_BASE_URL = "/api";

export default function DoctoralCenterAPI() {
  const { route } = ClientRoute();

  const fetchAutorizedUsers = async () => {
    return await route(`${API_URL}/authorized-users`, "GET");
  };

  const fetchUnauthorizedUsers = async () => {
    return await route(`${API_URL}/unauthorized-users`, "GET");
  };

  const getLogs = async () => {
    return await route(`${API_BASE_URL}/logs`, "GET");
  };

  const setUnauthorizedUserRoles = async (
    normalizedUnauthUsers,
    roleOption
  ) => {
    return await route(
      `${API_URL}/unauthorized-users/role?role=${roleOption}`,
      "POST",
      normalizedUnauthUsers
    );
  };

  const deleteAuthorizedUser = async (oid, role) => {
    // TODO: Improve this pls
    let reqRole = role;
    if (role == "manager" || role == "expert" || role == "admin")
      reqRole = "doctoralCenter";

    return await route(`${API_URL}/authorized-users?oid=${oid}`, "DELETE", {
      role: reqRole
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
