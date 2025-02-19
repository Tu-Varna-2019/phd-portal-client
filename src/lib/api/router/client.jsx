"use client";

import selectSessionToken from "@/features/sessionToken/slices/sessionTokenMemoSelector";
import { mediaType } from "@/helpers/utils";
import { useSelector } from "react-redux";

export default function ClientRoute() {
  const sessionToken = useSelector(selectSessionToken);

  const route = async ({
    url,
    method,
    body,
    requestContentType = mediaType.AppJson,
    responseContentType = mediaType.AppJson,
    accessTokenProvided = null
  }) => {
    try {
      if (body != null && requestContentType == mediaType.AppJson)
        body = JSON.stringify(body);
      // TODO : use useSelector instead, not used currently due to a BUG
      const accessToken =
        accessTokenProvided == null
          ? sessionToken.accessToken
          : accessTokenProvided;

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: accessToken
        },
        redirect: "follow",
        body: body
      });

      if (response.redirected) {
        console.warn("User is redirected");
        return [];
        // clear();
        // window.location.reload();
      } else if (response.status == 500 || response.status == 401) {
        return [];
      } else if (response.status == 200 || response.status == 201) {
        return await getContentTypeResponse(responseContentType, response);
      }
    } catch (exception) {
      console.error(`Fetch API error: ${exception}`);
      return [];
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
