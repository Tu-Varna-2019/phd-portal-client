import { createModelSchema, object, primitive } from "serializr";
import DoctoralCenterRole from "./DoctoralCenterRole";

export default class DoctoralCenter {
  constructor({ oid, name, email, picture, role } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.picture = picture;
    this.role = role;
  }
}

createModelSchema(DoctoralCenter, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  picture: primitive({
    default: "doctoralCenter_image.png"
  }),
  role: object(DoctoralCenterRole)
});
