import ServerRoute from "@/lib/api/router/server";
import { url } from "../url";

const { route } = ServerRoute();

export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get("role");
  const urlPath = `${url}/role/${role}`;

  return await route(urlPath, "POST", request);
}
