import ServerRoute from "@/lib/api/router/server";
import { url } from "../../url";

const { route } = ServerRoute();

export async function GET(request) {
  return await route({
    url: url + "/grades",
    method: "GET",
    getResultData: true,
    request: request
  });
}
