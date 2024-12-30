import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const reqHeaders = await headers();
    const accessToken = reqHeaders.get("authorization");

    const res = await fetch(
      `${process.env.BASE_URL}/doctoralcenter/unauthorized/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
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
