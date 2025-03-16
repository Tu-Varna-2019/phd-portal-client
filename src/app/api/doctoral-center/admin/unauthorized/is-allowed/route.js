import ServerRoute from "@/lib/api/router/server";
import { url } from "../../url";

const { route } = ServerRoute();

export async function PATCH(request) {
  return await route({
    url: url + "/unauthorized-users/is-allowed",
    method: "PATCH",
    request: request,
    queryParams: ["oid", "isAllowed"]
  });
}
