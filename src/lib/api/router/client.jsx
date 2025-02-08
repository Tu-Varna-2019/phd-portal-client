"use client";

import Auth from "@/lib/auth/auth";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { mediaType } from "@/lib/utils";
import { useSelector } from "react-redux";

export default function ClientRoute() {
  const sessionToken = useSelector(selectSessionToken);
  const { clear } = Auth();

  const route = async ({
    url,
    method,
    body,
    requestContentType = mediaType.AppJson,
    responseContentType = mediaType.AppJson
  }) => {
    try {
      if (body != null && requestContentType == mediaType.AppJson)
        body = JSON.stringify(body);

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: sessionToken.accessToken
        },
        redirect: "follow",
        body: body
      });

      if (response.redirected) {
        console.warn("User is redirected");
        // clear();
        // window.location.reload();
      } else if (response.status == 500) {
        return null;
      } else if (response.status == 200 || response.status == 201) {
        return await getContentTypeResponse(responseContentType, response);
      }
    } catch (exception) {
      console.error(`Fetch API error: ${exception}`);
    }
  };

  const getContentTypeResponse = async (contentType, response) => {
    if (contentType == mediaType.OctetStream) return response;
    else if (contentType == mediaType.AppJson) {
      const result = await response.json();
      return result;
    } else {
      console.error(
        `Error: Unable to return client response, due to unknown type ${contentType} !`
      );
    }
  };

  return {
    route
  };
}
