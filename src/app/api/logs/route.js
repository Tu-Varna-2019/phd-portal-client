import { url } from "./url";
import RouteAPI from "@/lib/api/router";

const { route } = RouteAPI();

export async function GET() {
  return await route(url, "GET");
}

export async function POST(request) {
  return await route(url, "POST", request);
}

export async function DELETE(request) {
  return await route(url, "DELETE", request);
}
