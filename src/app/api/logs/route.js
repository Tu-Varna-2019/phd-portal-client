import ServerRoute from "@/lib/api/router/server";
import { url } from "./url";

const { route } = ServerRoute();

export async function GET() {
  return await route(url, "GET");
}

export async function POST(request) {
  return await route(url, "POST", request);
}

export async function DELETE(request) {
  return await route(url, "DELETE", request);
}
