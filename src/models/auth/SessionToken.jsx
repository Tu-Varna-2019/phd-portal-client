import { createModelSchema, primitive } from "serializr";

export default class SessionToken {
  constructor({ accessToken } = {}) {
    this.accessToken = accessToken;
  }
}

createModelSchema(SessionToken, {
  accessToken: primitive()
});
