import { headers } from "next/headers";
import { NextResponse } from "next/server";

export default function RouteAPI() {
  const route = async (url, method, request) => {
    var res;
    try {
      const reqHeaders = await headers();
      const accessToken = reqHeaders.get("authorization");

      if (method == "GET") {
        res = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });
      } else {
        const body = await request.json();
        res = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(body)
        });
      }

      if (res.status == 401) {
        return NextResponse.json({ error: `Unauthorized` }, { status: 401 });
      }
      const data = await res.json();
      console.log(`API response: ${JSON.stringify(data)}`);

      const response = NextResponse.json(data, {
        status: res.status
      });

      return response;
    } catch (error) {
      console.error(`Error: ${error}`);
      return NextResponse.json(
        { error: `Server error: ${error}` },
        { status: 500 }
      );
    }
  };

  return {
    route
  };
}
