import ServerRoute from "@/lib/api/router/server";
import { url } from "./url";
import { mediaType } from "@/lib/utils";

const { route } = ServerRoute();

export async function GET(request) {
  return await route(
    url + "/download",
    "GET",
    request,
    mediaType.AppJson,
    ["type", "filename"],
    mediaType.OctetStream
  );
}

export async function POST(request) {
  return await route(
    url + "/upload",
    "POST",
    request,
    mediaType.FormData,
    "type"
  );
}

export async function DELETE(request) {
  return await route(url, "DELETE", request, mediaType.AppJson, "type");
}
