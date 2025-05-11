import ServerRoute from "@/lib/api/router/server";
import { url } from "../../url";

const { route } = ServerRoute();

export async function PATCH(request) {
  const body = JSON.stringify(await request.json());
  return await route({
    url: url + `/candidate/${body.email}/application/${body.status}`,
    method: "PATCH",
    request: request
  });
}
