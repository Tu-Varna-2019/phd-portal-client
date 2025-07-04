import ServerRoute from "@/lib/api/router/server";
import { url } from "../../url";

const { route } = ServerRoute();

export async function DELETE(request, { params }) {
  const { name } = params;

  return await route({
    url: url + "/commission/" + name,
    method: "DELETE",
    request: request
  });
}
