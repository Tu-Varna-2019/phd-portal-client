import { mediaType } from "@/helpers/utils";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export default function ServerRoute() {
  const route = async ({
    url,
    method,
    request,
    requestContentType = mediaType.AppJson,
    responseContentType = mediaType.AppJson,
    queryParams,
    getResultData = false
  }) => {
    try {
      let { headers } = await getHeaders(requestContentType);
      let body;

      if (method != "GET")
        body = await getBodyByContentType(request, requestContentType);

      if (queryParams != null)
        url += constructUrlByQueryParams(request.url, queryParams);

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
      reqHeaders.getSetCookie("group") + ";" + reqHeaders.getSetCookie("role");

    // BUG: for some reason setting up content type to multipart/form-data causes an error
    if (requestContentType == mediaType.FormData) {
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: cookieHeader
        }
      };
    }
    return {
      headers: {
        "Content-Type": requestContentType,
        Authorization: `Bearer ${accessToken}`,
        Cookie: cookieHeader
      }
    };
  };

  const constructUrlByQueryParams = (requestURL, queryParams) => {
    let queryValue;
    let url = "?";

    queryParams.forEach((query, index) => {
      queryValue = new URL(requestURL).searchParams.get(query);
      url += `${query}=` + queryValue;

      if (queryParams.length > 1 && index < queryParams.length) url += "&";
    });

    return url;
  };

  const getBodyByContentType = async (request, contentType) => {
    if (contentType == mediaType.AppJson) {
      return JSON.stringify(await request.json());
    } else if (contentType == mediaType.FormData) {
      return await request.formData();
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
        return NextResponse.json(
          { message: `NextJS Api route client error` },
          { status: 400 }
        );

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
        return NextResponse.json({
          message: `Nextjs Api router error. Status code not found for it to return value to the client: ${response.status}`,
          status: 500
        });
    }
  };

  return {
    route
  };
}
