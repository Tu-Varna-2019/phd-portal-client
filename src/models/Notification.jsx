import { createModelSchema, primitive } from "serializr";

export default class Notification {
  id;
  title;
  description;
  severity;
  creation;

  constructor(id, title, description, severity, creation) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.severity = severity;
    this.creation = creation;
  }
}

createModelSchema(Notification, {
  id: primitive(),
  title: primitive(),
  description: primitive(),
  severity: primitive(),
  // NOTE: Changed from date due to intrducing an infinite bell play sound bug for the result coming in not beign equivalent to the redux cache stored notifications
  creation: primitive()
});
