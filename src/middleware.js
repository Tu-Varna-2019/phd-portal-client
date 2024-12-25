import { NextResponse } from "next/server";

const allowedOrigins = ["*"];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export function middleware(request) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const role = request.cookies.get("role")?.value;
  const url = request.nextUrl.clone();
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) return sendPreflight(isAllowedOrigin, origin);

  const redirectUser = authByRole(url, role);
  if (redirectUser) return redirectUser;

  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  return response;
}

const authByRole = (url, role) => {
  if (url.pathname == "/") {
    console.log(`URL  ${url.pathname}`);
    url.pathname = "/" + role;
    return NextResponse.redirect(url);
  } else if (!url.pathname.startsWith("/" + role)) {
    url.pathname = "/not-found";
    return NextResponse.redirect(url);
  }
};

const sendPreflight = (isAllowedOrigin, origin) => {
  const preflightHeaders = {
    ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
    "Access-Control-Allow-Methods": corsOptions["Access-Control-Allow-Methods"],
    "Access-Control-Allow-Headers": corsOptions["Access-Control-Allow-Headers"]
  };
  return NextResponse.json({}, { headers: preflightHeaders });
};

export const config = {
  matcher: ["/api/:function*", "/phd", "/doctoralCenter", "/committee", "/"]
};
