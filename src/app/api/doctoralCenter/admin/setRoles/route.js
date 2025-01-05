import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const reqHeaders = await headers();
    const accessToken = reqHeaders.get("authorization");
    const cookie = reqHeaders.get("Cookie");
    const body = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");

    const res = await fetch(
      `${process.env.BASE_URL}/doctoralcenter/unauthorized/set/role/${role}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Cookie: cookie
        },
        body: JSON.stringify(body)
      }
    );
    const data = await res.json();
    console.log(
      `Fetching unauthorized users response: ${JSON.stringify(data)}`
    );

    const response = NextResponse.json(data, {
      status: res.status
    });

    if (response.status > 400 && response.status < 600) {
      return NextResponse.json(
        { error: data.data.message },
        { status: response.status }
      );
    }

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
