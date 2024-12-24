import { createModelSchema, object, primitive } from "serializr";
import DoctoralCenterRole from "./DoctoralCenterRole";

export default class DoctoralCenter {
  constructor({ oid, name, email, picture, doctoralCenterRole } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.picture = picture;
    this.doctoralCenterRole = doctoralCenterRole;
  }
}

createModelSchema(DoctoralCenter, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  picture: primitive({
    default: "doctoralCenter_image.png"
  }),
  doctoralCenterRole: object(DoctoralCenterRole)
});
