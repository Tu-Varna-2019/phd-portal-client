"use client";

import Auth from "@/lib/auth/auth";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { useSelector } from "react-redux";

export default function ClientRoute() {
  const sessionToken = useSelector(selectSessionToken);
  const { clear } = Auth();

  const route = async (url, method, body) => {
    var response;

    try {
      if (method == "GET")
        response = await fetch(url, {
          method: method,
          headers: {
            Authorization: sessionToken.accessToken
          },
          redirect: "follow"
        });
      else
        response = await fetch(url, {
          method: method,
          headers: {
            Authorization: sessionToken.accessToken
          },
          redirect: "follow",
          body: JSON.stringify(body)
        });

      if (response.redirected) {
        console.warn("User is redirected");
        // clear();
        // window.location.reload();
      } else {
        const result = await response.json();

        return result.data;
      }
    } catch (exception) {
      console.error(`Fetch api error: ${exception}`);
    }
  };

  return {
    route
  };
}
