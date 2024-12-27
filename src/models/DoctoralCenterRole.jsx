import { createModelSchema, primitive } from "serializr";

export default class DoctoralCenterRole {
  constructor({ role } = {}) {
    this.role = role;
  }
}

createModelSchema(DoctoralCenterRole, {
  role: primitive()
});
