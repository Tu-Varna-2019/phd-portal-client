import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { NextResponse } from "next/server";

// BUG: this crap dissallows to pass any headers
// export const dynamic = "force-static";

export async function POST(request, response) {
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

    console.log(`Status is ${response.status}`);
    if (response.status > 400 && response.status < 600) {
      return NextResponse.json(
        { error: body.message },
        { status: response.status }
      );
    }

    response.cookies.set("role", data.role, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV != "production"
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
