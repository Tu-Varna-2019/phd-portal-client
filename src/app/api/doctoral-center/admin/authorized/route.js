import ServerRoute from "@/lib/api/router/server";
import { url } from "../url.js";

const { route } = ServerRoute();

export async function GET() {
  return await route({
    url: url + "/authorized-users",
    method: "GET",
    getResultData: true
  });
}

export async function DELETE(request) {
  return await route({
    url: url + "/authorized-users",
    method: "DELETE",
    request: request,
    queryParams: ["oid", "group"]
  });
}
