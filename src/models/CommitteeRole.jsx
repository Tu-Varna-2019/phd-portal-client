import { createModelSchema, primitive } from "serializr";

export default class CommitteeRole {
  role;

  constructor(role) {
    this.role = role;
  }
}

createModelSchema(CommitteeRole, {
  role: primitive()
});
