"use client";
import { useSelector } from "react-redux";
import selectSessionToken from "../features/sessionToken/slices/sessionTokenMemoSelector";

const API_URL = "/api/doctoralCenter/admin";
const API_BASE_URL = "/api";

export default function DoctoralCenterAPI() {
  const sessionToken = useSelector(selectSessionToken);

  const fetchAutorizedUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/authorized-users`, {
        method: "GET",
        headers: {
          Authorization: sessionToken.accessToken
        }
      });

      const result = await response.json();
      return result.data;
    } catch (exception) {
      console.error(
        `Server error when trying to fetch authenticated users in ${exception}`
      );
    }
  };

  const fetchUnauthorizedUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/unauthorized-users`, {
        method: "GET",
        headers: {
          Authorization: sessionToken.accessToken
        }
      });

      const result = await response.json();
      return result.data;
    } catch (exception) {
      console.error(
        `Server error when trying to fetch unauthorized users in ${exception}`
      );
    }
  };

  const getLogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logs`, {
        method: "GET",
        headers: {
          Authorization: sessionToken.accessToken
        }
      });

      const result = await response.json();
      return result.data;
    } catch (exception) {
      console.error(
        `Server error when trying to retrieve logs in ${exception}`
      );
    }
  };

  const setUnauthorizedUserRoles = async (
    normalizedUnauthUsers,
    roleOption
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/unauthorized-users/role?role=${roleOption}`,
        {
          method: "POST",
          headers: {
            Authorization: sessionToken.accessToken
          },
          body: JSON.stringify(normalizedUnauthUsers)
        }
      );
      const result = await response.json();
      return result;
    } catch (exception) {
      console.error(`Server error when trying to set users in ${exception}`);
    }
  };

  const deleteAuthorizedUser = async (oid, role) => {
    try {
      // TODO: Improve this pls
      let reqRole = role;
      if (role == "manager" || role == "expert") reqRole = "doctoralCenter";

      await fetch(`${API_URL}/authorized-users?oid=${oid}`, {
        method: "DELETE",
        headers: {
          Authorization: sessionToken.accessToken
        },
        body: JSON.stringify({ role: reqRole })
      });
    } catch (exception) {
      console.error(`Server error when trying to delete user: ${exception}`);
    }
  };

  return {
    fetchAutorizedUsers,
    fetchUnauthorizedUsers,
    setUnauthorizedUserRoles,
    deleteAuthorizedUser,
    getLogs
  };
}
