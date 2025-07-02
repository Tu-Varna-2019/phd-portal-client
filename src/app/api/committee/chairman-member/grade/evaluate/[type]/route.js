import ServerRoute from "@/lib/api/router/server";
import { url } from "../../../../url";

const { route } = ServerRoute();

export async function PATCH(request, { params }) {
  const { type } = params;

  return await route({
    url: url + `/grade/evaluate/${type}`,
    method: "PATCH",
    request: request
  });
}
