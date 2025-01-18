import { url } from "./url";
import RouteAPI from "@/lib/api/router";

const { route } = RouteAPI();

export async function GET() {
  return await route(url, "GET");
}
