import { createModelSchema, primitive } from "serializr";

export default class Department {
  constructor({ name } = {}) {
    this.name = name;
  }
}

createModelSchema(Department, {
  name: primitive()
});
