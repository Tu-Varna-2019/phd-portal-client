"use client";

import ClientRoute from "@/router/client";

const API_URL = "/api/unauthorized/login";

export default function UnauthorizedAPI() {
  const { route } = ClientRoute();

  const login = async (accessToken) => {
    return await route({
      url: API_URL,
      method: "POST",
      accessTokenProvided: accessToken
    });
  };

  return {
    login
  };
}
