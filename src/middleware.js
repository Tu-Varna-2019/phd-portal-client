import { NextResponse } from "next/server";

const allowedOrigins = ["*"];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export function middleware(request) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      "Access-Control-Allow-Methods":
        corsOptions["Access-Control-Allow-Methods"],
      "Access-Control-Allow-Headers":
        corsOptions["Access-Control-Allow-Headers"]
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  return response;
}

export const config = {
  matcher: "/api/:function*"
};
