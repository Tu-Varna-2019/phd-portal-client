import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { url } from "../url";

export async function POST(request) {
  try {
    const reqHeaders = await headers();
    const accessToken = reqHeaders.get("authorization");
    const cookie = reqHeaders.get("Cookie");
    const body = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");

    const res = await fetch(`${url}/role/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: cookie
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log(
      `Setting role for unauthorized users response: ${JSON.stringify(data)}`
    );

    const response = NextResponse.json(data, {
      status: res.status
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
