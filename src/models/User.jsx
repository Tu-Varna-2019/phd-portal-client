import { createModelSchema, primitive } from "serializr";

export default class User {
  constructor({ oid, name, email, accessToken } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.accessToken = accessToken;
  }

  getName() {
    return this.name;
  }
}

createModelSchema(User, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  accessToken: primitive()
});
