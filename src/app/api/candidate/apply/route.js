import ServerRoute from "@/lib/api/router/server";
import { url } from "../url";

const { route } = ServerRoute();

export async function POST(request) {
  return await route({
    url: url + "/apply",
    method: "POST",
    request: request
  });
}
