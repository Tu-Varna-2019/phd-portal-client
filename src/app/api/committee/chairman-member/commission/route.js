import ServerRoute from "@/lib/api/router/server";
import { url } from "../../url";

const { route } = ServerRoute();

export async function GET(request) {
  return await route({
    url: url + "/commission",
    method: "GET",
    getResultData: true,
    request: request
  });
}

export async function POST(request) {
  return await route({
    url: url + "/commission",
    method: "POST",
    request: request
  });
}

export async function PUT(request) {
  return await route({
    url: url + "/commission",
    method: "PUT",
    request: request,
    queryParams: ["name"]
  });
}
