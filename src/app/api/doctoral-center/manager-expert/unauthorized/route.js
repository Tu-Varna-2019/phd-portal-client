import ServerRoute from "@/lib/api/router/server";
import { url } from "../url";

const { route } = ServerRoute();

export async function GET() {
  return await route({
    url: url + "/unauthorized",
    method: "GET",
    getResultData: true
  });
}

export async function POST(request) {
  return await route({
    url: url + "/unauthorized",
    method: "POST",
    request: request,
    queryParams: ["group"]
  });
}
