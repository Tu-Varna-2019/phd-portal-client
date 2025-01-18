import { url } from "./url";
import RouteAPI from "@/lib/api/router";

const { route } = RouteAPI();

export async function GET() {
  return await route(url, "GET");
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const oid = searchParams.get("oid");
  const urlPath = url + "/" + oid;

  return await route(urlPath, "DELETE", request);
}
