import ServerRoute from "@/lib/api/router/server";
import { url } from "../url";
import { mediaType } from "@/lib/helpers/utils";
import { cookies } from "next/headers";

const { route } = ServerRoute();

export async function POST(request) {
  const nextCookies = await cookies();

  nextCookies.set("candidate", "iliyan", {
    path: "/",
    httpOnly: true,
    sameSite: "Lax",

    secure: process.env.NODE_ENV != "production"
  });

  return await route({
    url: url + "/upload",
    method: "POST",
    request: request,
    requestContentType: mediaType.FormData
  });
}
