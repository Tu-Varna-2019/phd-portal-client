import { createModelSchema, primitive } from "serializr";

export default class File {
  name;
  data;
  mimeType;
}

createModelSchema(File, {
  name: primitive(),
  data: primitive(),
  mimeType: primitive()
});
