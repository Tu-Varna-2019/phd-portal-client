import { createModelSchema, primitive } from "serializr";

export default class Department {
  name;

  constructor(name) {
    this.name = name;
  }
}

createModelSchema(Department, {
  name: primitive()
});
