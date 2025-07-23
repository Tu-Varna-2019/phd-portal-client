"use client";

import selectSessionToken from "@/features/sessionToken/slices/sessionTokenMemoSelector";
import { mediaType } from "@/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import { useSelector } from "react-redux";

export default function ClientRoute() {
  const sessionToken = useSelector(selectSessionToken);
  const { tr } = Translate();

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
        // clear();
        // window.location.reload();
      } else if (response.status >= 400 && response.status < 500) {
        const result = await response.json();
        console.error(`Client side error with message: ${result.message}`);

        return { status: "error", message: result.message };
      } else if (response.status >= 500 && response.status < 600) {
        console.error(`Server side error!`);
        return {
          status: "error",
          message: tr(
            "Error with communicating with the server! Please try again later!"
          )
        };
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
      result.status = "success";

      return result;
    } else {
      console.error(
        `Error: Unable to return client response, due to unknown type ${contentType}`
      );
    }
  };

  return {
    route
  };
}
