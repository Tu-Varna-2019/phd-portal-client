import ServerRoute from "@/lib/api/router/server";
import { url } from "../url";

const { route } = ServerRoute();

export async function GET() {
  return await route({
    url: url + "/unauthorized-users",
    method: "GET",
    getResultData: true
  });
}
