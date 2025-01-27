import { NextResponse } from "next/server";

const allowedOrigins = ["*"];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export function middleware(request) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const groupCookie = request.cookies.get("group")?.value;
  const roleCookie = request.cookies.get("role")?.value;
  const url = request.nextUrl.clone();

  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) return sendPreflight(isAllowedOrigin, origin);

  if (!url.pathname.startsWith("/api/")) {
    const cookiePath =
      groupCookie == null ? null : groupCookie + "/" + roleCookie;

    const redirect = redirectByCookie(url, cookiePath);
    if (redirect) return redirect;
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  response.cookies.set("group", groupCookie);
  response.cookies.set("role", roleCookie);

  return response;
}

const redirectByCookie = (url, cookie) => {
  const originalPathname = url.pathname;

  switch (cookie) {
    case null:
      if (url.pathname != "/") url.pathname = "/unauthorized";
      break;

    default:
      if (url.pathname == "/" || url.pathname == "/doctoralCenter")
        url.pathname = "/" + cookie;
      else if (
        !url.pathname.startsWith("/" + cookie) &&
        !url.pathname.startsWith("/api")
      )
        url.pathname = "/unauthorized";
      break;
  }

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
    "/doctoralCenter/:path*",
    "/committee",
    "/",
    "/unauthorized"
  ]
};
