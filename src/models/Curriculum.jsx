import { createModelSchema, list, primitive } from "serializr";

export default class Curriculum {
  name;
  mode;
  subjects;
}

createModelSchema(Curriculum, {
  name: primitive(),
  mode: primitive(),
  subjects: list(primitive())
});
