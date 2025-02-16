import { cookies, headers } from "next/headers";
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

    const payload = await res.json();
    const loginLog = JSON.stringify(payload, (key, value) => {
      if (key === "picture") return undefined;
      return value;
    });

    console.log(`Login response: ${loginLog}`);
    const isRoleAdmin =
      "role" in payload.data && payload.data.role.role == "admin";

    const nextCookies = await cookies();
    nextCookies.set("group", payload.group, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV != "production"
    });

    // TODO: Improve this pls
    if (isRoleAdmin) {
      nextCookies.set("role", payload.data.role.role, {
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV != "production"
      });
    }

    return NextResponse.json(payload, {
      status: res.status
    });
  } catch (error) {
    console.error(`Error in sendnig login response: ${error}`);
    return NextResponse.json(
      { error: `Server error ${error} ` },
      { status: 500 }
    );
  }
}
