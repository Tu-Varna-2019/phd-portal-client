import ServerRoute from "@/lib/api/router/server";
import { url } from "../../url";

const { route } = ServerRoute();

export async function PATCH(request) {
  const body = await request.json();

  return await route({
    url: url + `/grade/${body.id}/commission/${body.name}`,
    method: "PATCH",
    request: request
  });
}
