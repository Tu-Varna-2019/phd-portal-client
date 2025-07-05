import ServerRoute from "@/lib/api/router/server";
import { url } from "../../../../url";

const { route } = ServerRoute();

export async function PATCH(request, { params }) {
  const { id, _, name } = await params;

  return await route({
    url: url + `/grade/${id}/commission/${name}`,
    method: "PATCH",
    request: request
  });
}
