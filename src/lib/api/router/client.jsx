"use client";

import Auth from "@/lib/auth/auth";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { mediaType } from "@/lib/utils";
import { useSelector } from "react-redux";

export default function ClientRoute() {
  const sessionToken = useSelector(selectSessionToken);
  const { clear } = Auth();

  const route = async (url, method, body, contentType = mediaType.AppJson) => {
    let response;
    let bodyResponse;

    try {
      if (method != "GET")
        bodyResponse =
          contentType == mediaType.AppJson ? JSON.stringify(body) : body;

      response = await fetch(url, {
        method: method,
        headers: {
          Authorization: sessionToken.accessToken
        },
        redirect: "follow",
        body: bodyResponse
      });

      if (response.redirected) {
        console.warn("User is redirected");
        // clear();
        // window.location.reload();
      } else if (response.status == 500) {
        return null;
      } else {
        if (contentType == mediaType.OctetStream) return response;

        const result = await response.json();
        return result;
      }
    } catch (exception) {
      console.error(`Fetch API error: ${exception}`);
    }
  };

  return {
    route
  };
}
