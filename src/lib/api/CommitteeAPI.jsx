"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/committee";
const API_SHARED_URL = API_URL + "/chairman-member";

export default function CommitteeAPI() {
  const { route } = ClientRoute();

  const getCandidates = async (fields) => {
    return await route({
      url: `${API_SHARED_URL}/candidates?fields=${fields}`,
      method: "GET"
    });
  };

  const getGrades = async () => {
    return await route({
      url: `${API_SHARED_URL}/grades`,
      method: "GET"
    });
  };

  const getCommission = async () => {
    return await route({
      url: `${API_SHARED_URL}/commission`,
      method: "GET"
    });
  };

  const getCommissions = async () => {
    return await route({
      url: `${API_SHARED_URL}/commissions`,
      method: "GET"
    });
  };

  const createCommission = async (name, committees) => {
    const committeOids = [];
    committees.forEach((committee) => {
      committeOids.push({ oid: committee.oid });
    });

    return await route({
      url: `${API_SHARED_URL}/commission`,
      method: "POST",
      body: {
        name: name,
        committees: committeOids
      }
    });
  };

  const modifyCommission = async ({ name, newName, committees }) => {
    const committeOids = [];
    committees.forEach((committee) => {
      committeOids.push({ oid: committee.oid });
    });

    return await route({
      url: `${API_SHARED_URL}/commission?name=${newName}`,
      method: "PUT",
      body: {
        name: name,
        committees: committeOids
      }
    });
  };

  const evaluateGrade = async (type, grade, subject, pin) => {
    return await route({
      url: `${API_SHARED_URL}/grade/evaluate/${type}`,
      method: "PATCH",
      body: {
        grade,
        subject,
        pin
      }
    });
  };

  return {
    getCandidates,
    getGrades,
    getCommission,
    getCommissions,
    evaluateGrade,
    createCommission,
    modifyCommission
  };
}
