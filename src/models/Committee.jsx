import { createModelSchema, primitive } from "serializr";

export default class Committee {
  constructor({
    oid,
    name,
    email,
    picture,
    grade,
    department,
    committeeType
  } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.picture = picture;
    this.grade = grade;
    this.department = department;
    this.committeeType = committeeType;
  }

  static isDefaultImageNameEQ(picture) {
    return Boolean(picture == DEFAULT_COMMITTEE_PICTURE);
  }
}

createModelSchema(Committee, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  picture: primitive({
    default: ""
  }),
  pictureBlob: primitive({}),
  grade: primitive(),
  department: primitive(),
  committeeType: primitive()
});
