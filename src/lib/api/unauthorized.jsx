"use client";

import ClientRoute from "./router/client";

const API_URL = "/api/unauthorized/login";

export default function UnauthorizedAPI() {
  const { route } = ClientRoute();

  const fetchLogin = async (userCreds) => {
    return await route({ url: API_URL, method: "POST", body: userCreds });
  };

  return {
    fetchLogin
  };
}
