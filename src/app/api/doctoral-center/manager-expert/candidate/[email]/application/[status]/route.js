import ServerRoute from "@/lib/api/router/server";
import { url } from "../../../../url";

const { route } = ServerRoute();

export async function PATCH(request, { params }) {
  const { email, _, status } = params;

  return await route({
    url: url + `/candidate/${email}/application/${status}`,
    method: "PATCH",
    request: request
  });
}
