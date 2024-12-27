import { createModelSchema, primitive } from "serializr";

export default class Mode {
  constructor({ mode } = {}) {
    this.mode = mode;
  }
}

createModelSchema(Mode, {
  mode: primitive()
});
