import { createModelSchema, primitive } from "serializr";

export default class CommitteeType {
  constructor({ type } = {}) {
    this.type = type;
  }
}

createModelSchema(CommitteeType, {
  type: primitive()
});
