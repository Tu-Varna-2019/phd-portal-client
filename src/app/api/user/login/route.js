import { headers } from "next/headers";
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

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(`Error occured in the login: ${error}`);
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
