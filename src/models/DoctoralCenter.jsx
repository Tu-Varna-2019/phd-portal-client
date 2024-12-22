import { createModelSchema, object, primitive } from "serializr";
import DoctoralCenterRole from "./DoctoralCenterRole";

export default class DoctoralCenter {
  constructor({ oid, name, email, doctoralCenterRole } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.doctoralCenterRole = doctoralCenterRole;
  }
}

createModelSchema(DoctoralCenter, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  doctoralCenterRole: object(DoctoralCenterRole)
});
