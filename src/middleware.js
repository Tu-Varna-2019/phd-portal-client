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
  const originalPathname = url.pathname;

  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) return sendPreflight(isAllowedOrigin, origin);

  if (!originalPathname.startsWith("/api/")) {
    const redirect = authByGroupCookie(url, originalPathname, groupCookie);
    if (redirect) return redirect;
  } else {
    // NOTE: add cookie to every subsequent request
    if (groupCookie != null) {
      request.headers.set("Cookie", `group=${groupCookie};role=${roleCookie}`);
    }
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  return response;
}

const authByGroupCookie = (url, originalPathname, groupCookie) => {
  if (groupCookie == null && url.pathname != "/")
    url.pathname = "/unauthorized";
  else if (url.pathname == "/" && groupCookie != null)
    url.pathname = "/" + groupCookie;
  else if (
    groupCookie != null &&
    !url.pathname.startsWith("/" + groupCookie) &&
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
    "/doctoralCenter/:path*",
    "/committee",
    "/",
    "/unauthorized"
  ]
};
