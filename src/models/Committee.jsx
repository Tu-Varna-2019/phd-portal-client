import { createModelSchema, object, primitive } from "serializr";
import CommitteeType from "./CommitteeType";
import Department from "./Department";

const DEFAULT_COMMITTEE_PICTURE = "committee_image.png";

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

  static getDefaultPictureBlob = () => {
    return "/" + DEFAULT_COMMITTEE_PICTURE;
  };
}

createModelSchema(Committee, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  picture: primitive({
    default: DEFAULT_COMMITTEE_PICTURE
  }),
  pictureBlob: primitive({}),
  grade: primitive(),
  department: object(Department),
  committeeType: object(CommitteeType)
});
