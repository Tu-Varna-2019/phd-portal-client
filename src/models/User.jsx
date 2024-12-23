import { createModelSchema, primitive } from "serializr";

export default class User {
  constructor({ oid, name, email } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
  }

  getName() {
    return this.name;
  }
}

createModelSchema(User, {
  oid: primitive(),
  name: primitive(),
  email: primitive()
});
