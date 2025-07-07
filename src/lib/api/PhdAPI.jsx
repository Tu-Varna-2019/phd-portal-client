"use client";
import ClientRoute from "@/router/client";

const API_URL = "/api/phd";

export default function PhdAPI() {
  const { route } = ClientRoute();

  const getGrades = async () => {
    return await route({
      url: `${API_URL}/grades`,
      method: "GET"
    });
  };

  const setAttachmentsToGrade = async (id, attachments) => {
    return await route({
      url: `${API_URL}/grade/${id}`,
      method: "PATCH",
      body: attachments
    });
  };

  return {
    getGrades,
    setAttachmentsToGrade
  };
}
