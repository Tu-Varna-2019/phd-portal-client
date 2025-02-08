import { mediaType } from "@/lib/utils";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export default function ServerRoute() {
  const route = async (
    url,
    method,
    request,
    contentType = mediaType.AppJson,
    queryParam = null,
    producesMediaType = mediaType.AppJson
  ) => {
    var response;

    try {
      let { headers } = await getHeaders(contentType);
      let body;

      if (method != "GET") {
        if (contentType == mediaType.AppJson) {
          const requestJson = await request.json();
          body = JSON.stringify(requestJson);
        } else if (contentType == mediaType.FormData) {
          body = await request.formData();
        }
      }

      if (queryParam != null)
        url += constructUrlByQueryParams(request.url, queryParam);

      response = await fetch(url, {
        method: method,
        headers: headers,
        body: body
      });

      if (response.status == 401)
        return NextResponse.redirect(
          new URL("/unauthorized", "https://localhost:3000")
        );

      if (producesMediaType == mediaType.AppJson) {
        const data = await response.json();

        // NOTE: Disable logging API response for notifications
        if (!url.endsWith("/notify")) {
          console.log(`API response: ${JSON.stringify(data)}`);
        }

        return NextResponse.json(data, {
          status: response.status
        });
      } else if (producesMediaType == mediaType.OctetStream) {
        const blob = await response.blob();

        return new NextResponse(blob, {
          status: 200,
          headers: {
            "Content-Type": blob.type
          }
        });
      }
    } catch (error) {
      return NextResponse.json(
        { error: `Server error: ${error}` },
        { status: 500 }
      );
    }
  };

  const getHeaders = async (contentType) => {
    const reqHeaders = await headers();
    const accessToken = reqHeaders.get("authorization");
    const cookieHeader =
      reqHeaders.getSetCookie("group") + ";" + reqHeaders.getSetCookie("role");

    // BUG: for some reason setting up content type to multipart/form-data causes an error
    if (contentType == mediaType.FormData) {
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: cookieHeader
        }
      };
    }
    return {
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${accessToken}`,
        Cookie: cookieHeader
      }
    };
  };

  const constructUrlByQueryParams = (requestURL, queryParam) => {
    let queryValue;
    let url = "?";

    queryParam.forEach((query, index) => {
      queryValue = new URL(requestURL).searchParams.get(query);
      url += `${query}=` + queryValue;

      if (queryParam.length > 1 && index < queryParam.length) url += "&";
    });

    return url;
  };

  return {
    route
  };
}
