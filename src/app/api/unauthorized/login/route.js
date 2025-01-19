import { headers } from "next/headers";
import { NextResponse } from "next/server";

// INFO: outliar to the rest of the endpoints
export async function POST(request) {
  try {
    const body = await request.json();
    const reqHeaders = await headers();
    const accessToken = reqHeaders.get("authorization");
    console.log(accessToken);

    const res = await fetch(`${process.env.BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    console.log(`Login response: ${JSON.stringify(data)}`);

    const response = NextResponse.json(data, {
      status: res.status
    });

    if (response.status > 400 && response.status < 600) {
      return NextResponse.json(
        { error: body.message },
        { status: response.status }
      );
    }

    response.cookies.set("group", data.group, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV != "production"
    });

    if ("role" in data.data)
      response.cookies.set("role", data.data.role.role, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV != "production"
      });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
