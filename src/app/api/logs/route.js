import ServerRoute from "@/lib/api/router/server";
import { url } from "./url";

const { route } = ServerRoute();

export async function GET() {
  return await route({ url: url, method: "GET", getResultData: true });
}

export async function POST(request) {
  return await route({ url: url, method: "POST", request: request });
}

export async function DELETE(request) {
  return await route({ url: url, method: "DELETE", request: request });
}
