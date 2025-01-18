import { url } from "../url";
import RouteAPI from "@/lib/api/router";

const { route } = RouteAPI();

export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get("role");
  const urlPath = `${url}/role/${role}`;

  return await route(urlPath, "POST", request);
}
