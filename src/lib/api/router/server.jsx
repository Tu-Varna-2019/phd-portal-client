import { mediaType } from "@/helpers/utils";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export default function ServerRoute() {
  const route = async ({
    url,
    method,
    request,
    queryParams,
    requestContentType = mediaType.AppJson,
    responseContentType = mediaType.AppJson,
    getResultData = false
  }) => {
    try {
      let { headers } = await getHeaders(requestContentType);
      let body = await getBodyByContentType(request, requestContentType);
      url += constructUrlByQueryParams(request, queryParams);
      console.log(`Headers: ${JSON.stringify(headers)}`);

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body
      });

      return await sendResponseByStatusCode(
        response,
        url,
        responseContentType,
        getResultData
      );
    } catch (error) {
      return NextResponse.json(
        { message: `NextJS Api route error: ${error}` },
        { status: 500 }
      );
    }
  };

  const getHeaders = async (requestContentType) => {
    const reqHeaders = await headers();
    const accessToken = reqHeaders.get("authorization");
    const cookieHeader =
      reqHeaders.getSetCookie("group") +
      ";" +
      reqHeaders.getSetCookie("role") +
      ";" +
      reqHeaders.getSetCookie("candidate");

    const headersRes = {
      "Content-Type": requestContentType,
      Authorization: `Bearer ${accessToken}`,
      Cookie: cookieHeader
    };

    if (accessToken == "undefined") {
      delete headersRes.Authorization;
    }

    // BUG: for some reason setting up content type to multipart/form-data causes an error
    if (requestContentType == mediaType.FormData) {
      delete headersRes["Content-Type"];
    }

    return {
      headers: headersRes
    };
  };

  const constructUrlByQueryParams = (request, queryParams) => {
    if (queryParams == null || request.url == undefined) return "";
    let queryValue;
    let url = "?";

    queryParams.forEach((query, index) => {
      queryValue = new URL(request.url).searchParams.get(query);
      url += `${query}=${queryValue}`;
      if (index + 1 < queryParams.length) url += "&";
    });

    return url;
  };

  const getBodyByContentType = async (request, contentType) => {
    try {
      if (contentType == mediaType.AppJson) {
        return JSON.stringify(await request.json());
      } else if (contentType == mediaType.FormData) {
        return await request.formData();
      }
    } catch (error) {
      console.warn("NextJs Api warn: No body was provided");
    }
  };

  const sendResponseByStatusCode = async (
    response,
    url,
    responseContentType,
    getResultData
  ) => {
    switch (response.status) {
      case 401:
        return NextResponse.redirect(new URL("/", "https://localhost:3000"));
      case 400:
        throw new Error("NextJS Api route client error");
      case 500:
        throw new Error("Nextjs Server side error");
      case 200:
      case 201:
        if (responseContentType == mediaType.AppJson) {
          const result = await response.json();
          const data = getResultData ? result.data : result;

          // NOTE: Disable logging API response for notifications
          if (!url.endsWith("notifiy")) {
            console.log(`API response: ${JSON.stringify(data)}`);
          }
          return NextResponse.json(data, {
            status: response.status
          });
        } else if (responseContentType == mediaType.OctetStream) {
          const blob = await response.blob();

          return new NextResponse(blob, {
            status: 200,
            headers: {
              "Content-Type": blob.type
            }
          });
        }
      default:
        throw new Error(`Unknown error code: ${response.status}`);
    }
  };

  return {
    route
  };
}
