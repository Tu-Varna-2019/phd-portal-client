"use client";

const API_URL = "/api/unauthorized/login";

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

      // TODO: Improve this part
      if (response.status == 500) return "/server-error";
      else if (response.status == 401) return "/unauthorized";
      else {
        const result = await response.json();
        return result;
      }
    } catch (exception) {
      console.error(`Server error when trying to log in ${exception}`);
      return "/server-error";
    }
  };

  return {
    fetchLogin
  };
}
