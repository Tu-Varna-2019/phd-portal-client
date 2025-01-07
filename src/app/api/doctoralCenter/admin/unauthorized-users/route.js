import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { url } from "./url";

export async function GET() {
  try {
    const reqHeaders = await headers();
    const accessToken = reqHeaders.get("authorization");
    const cookie = reqHeaders.get("Cookie");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: cookie
      }
    });
    const data = await res.json();
    console.log(`Unauthorized users response: ${JSON.stringify(data)}`);

    const response = NextResponse.json(data, {
      status: res.status
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
