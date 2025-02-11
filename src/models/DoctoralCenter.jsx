import { createModelSchema, object, primitive } from "serializr";
import DoctoralCenterRole from "./DoctoralCenterRole";

const DEFAULT_DOCTORALCENTER_PICTURE = "doctoralCenter_image.png";

export default class DoctoralCenter {
  oid;
  name;
  email;
  picture;
  pictureBlob;
  role;

  static isDefaultImageNameEQ(picture) {
    return Boolean(picture == DEFAULT_DOCTORALCENTER_PICTURE);
  }

  constructor(oid, name, email, picture, pictureBlob, role) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.picture = picture;
    this.pictureBlob = pictureBlob;
    this.role = role;
  }

  static getDefaultPictureBlob = () => {
    return "/" + DEFAULT_DOCTORALCENTER_PICTURE;
  };
}

createModelSchema(DoctoralCenter, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  picture: primitive({
    default: DEFAULT_DOCTORALCENTER_PICTURE
  }),
  role: object(DoctoralCenterRole)
});
