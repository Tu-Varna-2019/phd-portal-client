import { NextResponse } from "next/server";

const allowedOrigins = ["*"];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export function middleware(request) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const roleCookie = request.cookies.get("role")?.value;
  const url = request.nextUrl.clone();
  const originalPathname = url.pathname;

  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) return sendPreflight(isAllowedOrigin, origin);

  if (!originalPathname.startsWith("/api/")) {
    const redirect = authByRoleCookie(url, originalPathname, roleCookie);
    if (redirect) return redirect;
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  return response;
}

const authByRoleCookie = (url, originalPathname, roleCookie) => {
  if (roleCookie == null && url.pathname != "/") url.pathname = "/unauthorized";
  else if (url.pathname == "/" && roleCookie != null)
    url.pathname = "/" + roleCookie;
  else if (
    roleCookie != null &&
    !url.pathname.startsWith("/" + roleCookie) &&
    !url.pathname.startsWith("/api")
  )
    url.pathname = "/unauthorized";

  if (originalPathname != url.pathname) return NextResponse.redirect(url);
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
  matcher: [
    "/api/:function*",
    "/phd",
    "/doctoralCenter",
    "/committee",
    "/",
    "/unauthorized"
  ]
};
