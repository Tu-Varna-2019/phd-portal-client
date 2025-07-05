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
      url: `${API_URL}/unauthorized`,
      method: "GET"
    });
  };

  const setUnauthorizedUserGroup = async (unauthUsers, group) => {
    return await route({
      url: `${API_URL}/unauthorized/group?group=${group}`,
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

  const review = async (email, status) => {
    return await route({
      url: `${API_URL}/candidate/${email}/application/${status}`,
      method: "PATCH"
    });
  };

  const setCommissionOnGrade = async (id, name) => {
    return await route({
      url: `${API_URL}/grade/${id}/commission/${name}`,
      method: "PATCH"
    });
  };

  return {
    getCandidates,
    getUnauthorizedUsers,
    setUnauthorizedUserGroup,
    getDocCenterRoles,
    review,
    getGrades,
    getCommission,
    setCommissionOnGrade
  };
}
