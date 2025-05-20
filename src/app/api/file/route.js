import ServerRoute from "@/lib/api/router/server";
import { url } from "./url";
import { mediaType } from "@/lib/helpers/utils";

const { route } = ServerRoute();

export async function GET(request) {
  return await route({
    url: url + "/download",
    method: "GET",
    request: request,
    requestContentType: mediaType.AppJson,
    responseContentType: mediaType.OctetStream,
    queryParams: ["key"]
  });
}

export async function POST(request) {
  return await route({
    url: url + "/upload",
    method: "POST",
    request: request,
    requestContentType: mediaType.FormData,
    queryParams: ["type"]
  });
}

export async function DELETE(request) {
  return await route({
    url: url,
    method: "DELETE",
    request: request,
    requestContentType: mediaType.AppJson,
    queryParams: ["type"]
  });
}
