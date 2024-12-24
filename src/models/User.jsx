import { createModelSchema, primitive } from "serializr";

export default class User {
  constructor({ oid, name, email, timestamp } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.timestamp = timestamp;
  }
}

createModelSchema(User, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  timestamp: primitive()
});
