import { NextResponse } from "next/server";

const allowedOrigins = ["localhost:3000"];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const commonPaths = ["/notifications", "/profile"];

export function middleware(request) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const groupCookie = request.cookies.get("group")?.value;
  const roleCookie = request.cookies.get("role")?.value;

  const url = request.nextUrl.clone();
  const isUrlApiRoute = url.pathname.startsWith("/api/");

  const isPreflight = request.method === "OPTIONS";
  if (isPreflight) return sendPreflight(isAllowedOrigin, origin);

  if (!isUrlApiRoute) {
    const cookie = getCookiePath(groupCookie, roleCookie);
    const redirect = redirectByCookiePath(url, cookie);
    if (redirect) return redirect;
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  if (groupCookie != undefined)
    response.cookies.set("group", groupCookie, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV != "production"
    });

  if (roleCookie != undefined)
    response.cookies.set("role", roleCookie, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV != "production"
    });

  return response;
}

const getCookiePath = (groupCookie, roleCookie) => {
  let cookie = null;

  switch (groupCookie) {
    case "doctoralCenter":
      if (roleCookie != null) cookie = groupCookie + "/" + roleCookie;
      else cookie = groupCookie;
      break;
    case ("phd", "committee"):
      cookie = groupCookie;
      break;
    default:
      console.warn(`Middleware: Unable to get cookie for path: ${cookie}`);
      break;
  }
  return cookie;
};

const redirectByCookiePath = (url, cookie) => {
  let isRedirectNeeded = false;

  switch (cookie) {
    case null:
      if (url.pathname != "/") {
        url.pathname = "/";
        isRedirectNeeded = true;
      }
      break;

    default:
      const matchedIndexPath = isCommonPathFound(url.pathname);

      if (url.pathname != "/" + cookie) {
        url.pathname = "/" + cookie;
        isRedirectNeeded = true;
      } else if (matchedIndexPath != -1) {
        url.pathname = "/" + cookie + commonPaths[matchedIndexPath];
        isRedirectNeeded = true;
        break;
      }
  }

  if (isRedirectNeeded) return NextResponse.redirect(url);
};

const isCommonPathFound = (path) => {
  return commonPaths.findIndex((element) => element.includes(path));
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
    "/",
    "/api/:function*",
    "/phd/:path*",
    "/doctoralCenter/:path*",
    "/committee",
    "/notifications",
    "/settings",
    "/profile"
  ]
};
