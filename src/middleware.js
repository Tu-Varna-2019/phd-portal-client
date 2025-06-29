import { NextResponse } from "next/server";

const allowedOrigins = ["localhost:3000"];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const routes = [
  "/phd",
  "/committee/chairman",
  "/committee/member",
  "/doctoral-center/expert",
  "/doctoral-center/manager",
  "/doctoral-center/admin"
];

export function middleware(request) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const groupCookie = request.cookies.get("group")?.value;
  const roleCookie = request.cookies.get("role")?.value;
  const candidateCookie = request.cookies.get("candidate")?.value;

  const url = request.nextUrl.clone();
  const isUrlApiRoute = url.pathname.startsWith("/api/");

  const isPreflight = request.method === "OPTIONS";
  if (isPreflight) return sendPreflight(isAllowedOrigin, origin);

  if (!isUrlApiRoute) {
    const redirect = redirectByCookiePath(url, groupCookie, roleCookie);
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
      /* eslint-disable no-undef */
      secure: process.env.NODE_ENV != "production"
    });

  if (roleCookie != undefined)
    response.cookies.set("role", roleCookie, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      /* eslint-disable no-undef */
      secure: process.env.NODE_ENV != "production"
    });

  if (candidateCookie != undefined)
    response.cookies.set("candidate", candidateCookie, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      /* eslint-disable no-undef */
      secure: process.env.NODE_ENV != "production"
    });

  return response;
}

const redirectByCookiePath = (url, groupCookie, roleCookie) => {
  let cookie = null;

  switch (groupCookie) {
    case ("doctoral-center", "committee"):
      cookie = groupCookie + "/" + roleCookie;
      break;
    case ("phd", "supervisor"):
      cookie = groupCookie;
      break;
    default:
      console.warn(`Middleware: Unable to get cookie for path: ${cookie}`);
      break;
  }

  const isUserAuthorized =
    cookie != null &&
    !url.pathname.startsWith("/" + cookie) &&
    routes.find((route) => url.pathname.startsWith(route));
  const isUserInMainPage = cookie != null && url.pathname == "/";

  if (isUserAuthorized) {
    url.pathname = "/forbidden";
    return NextResponse.redirect(url);
  } else if (isUserInMainPage) {
    url.pathname = "/" + cookie;
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
  matcher: [
    "/",
    "/api/:function*",
    "/phd/:path*",
    "/doctoral-center/:path*",
    "/committee/:path*"
  ]
};
