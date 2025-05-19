import ServerRoute from "@/lib/api/router/server";
import { url } from "../../url";

const { route } = ServerRoute();

export async function PATCH(request) {
  const body = await request.json();
  const urlFinal = url + `/candidate/${body.email}/application/${body.status}`;

  console.log(`Body: ${urlFinal}`);

  return await route({
    url: url + `/candidate/${body.email}/application/${body.status}`,
    method: "PATCH",
    request: request
  });
}
