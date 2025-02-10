"use client";

const API_URL = "/api/unauthorized/login";

// INFO: outliar to use client api
export default function UnauthorizedAPI() {
  const fetchLogin = async (userCreds, accessToken) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: accessToken
        },
        body: JSON.stringify(userCreds)
      });

      let result;
      if (response.status == 401) {
        result = { path: "unauthorized" };
      } else {
        result = await response.json();
      }
      return result;
    } catch (exception) {
      console.error(`Server error when trying to log in ${exception}`);
    }
  };

  return {
    fetchLogin
  };
}
