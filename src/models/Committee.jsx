import { createModelSchema, primitive, object } from "serializr";
import CommitteeRole from "./CommitteeRole";

export default class Committee {
  constructor({ oid, name, email, picture, department, role } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.picture = picture;
    this.department = department;
    this.role = role;
  }

  static isDefaultImageNameEQ(picture) {
    return Boolean(picture == DEFAULT_COMMITTEE_PICTURE);
  }
}

createModelSchema(Committee, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  picture: primitive({
    default: ""
  }),
  pictureBlob: primitive({}),
  department: primitive(),
  role: object(CommitteeRole)
});
