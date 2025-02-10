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

    if (res.status == 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await res.json();

    console.log(`Login response: ${JSON.stringify(data)}`);

    let path = data.group;
    if ("role" in data.data) path += data.data.role;

    const response = NextResponse.json(data, {
      status: res.status,
      path: path
    });

    response.cookies.set("group", data.group, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV != "production"
    });

    if ("role" in data.data) {
      response.cookies.set("role", data.data.role.role, {
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV != "production"
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
