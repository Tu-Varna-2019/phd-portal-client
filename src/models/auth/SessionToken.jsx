import { createModelSchema, primitive } from "serializr";

export default class SessionToken {
  group;
  accessToken;

  constructor(group, accessToken) {
    this.group = group;
    this.accessToken = accessToken;
  }
}

createModelSchema(SessionToken, {
  group: primitive(),
  accessToken: primitive()
});
