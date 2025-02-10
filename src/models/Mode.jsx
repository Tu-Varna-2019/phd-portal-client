import { createModelSchema, primitive } from "serializr";

export default class Mode {
  mode;

  constructor(mode) {
    this.mode = mode;
  }
}

createModelSchema(Mode, {
  mode: primitive()
});
