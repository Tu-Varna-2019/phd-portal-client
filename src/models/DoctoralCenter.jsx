import { createModelSchema, object, primitive } from "serializr";
import DoctoralCenterRole from "./DoctoralCenterRole";

export const DEFAULT_DOCTORALCENTER_IMAGE = "doctoralCenter_image.png";

export default class DoctoralCenter {
  oid;
  name;
  email;
  picture;
  pictureBlob;
  role;

  static isDefaultImageNameEQ(picture) {
    return Boolean(picture == DEFAULT_DOCTORALCENTER_IMAGE);
  }

  constructor(oid, name, email, picture, pictureBlob, role) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.picture = picture;
    this.pictureBlob = pictureBlob;
    this.role = role;
  }
}

createModelSchema(DoctoralCenter, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  picture: primitive({
    default: DEFAULT_DOCTORALCENTER_IMAGE
  }),
  pictureBlob: primitive(),
  role: object(DoctoralCenterRole)
});
