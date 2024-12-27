import { createModelSchema, primitive } from "serializr";

export default class StatusPhd {
  constructor({ status } = {}) {
    this.status = status;
  }
}

createModelSchema(StatusPhd, {
  status: primitive()
});
