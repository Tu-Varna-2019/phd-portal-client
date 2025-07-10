import { createModelSchema, primitive } from "serializr";

export default class Phd {
  oid;
  firstName;
  middleName;
  lastName;
  picture;
  country;
  city;
  address;
  pin;
  email;
  dissertationTopic;
  enrollDate;
  gradDate;

  constructor(
    oid,
    firstName,
    middleName,
    lastName,
    picture,
    country,
    city,
    address,
    pin,
    email,
    dissertationTopic,
    enrollDate,
    gradDate
    // status,
    // curriculum,
    // supervisor,
    // department,
    // report
  ) {
    this.oid = oid;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.picture = picture;
    this.country = country;
    this.city = city;
    this.address = address;
    this.pin = pin;
    this.email = email;
    this.dissertationTopic = dissertationTopic;
    this.enrollDate = enrollDate;
    this.gradDate = gradDate;
    // this.status = status;
    // this.curriculum = curriculum;
    // this.supervisor = supervisor;
    // this.department = department;
    // this.report = report;
  }

  static isDefaultImageNameEQ(picture) {
    return Boolean(picture == DEFAULT_PHD_PICTURE);
  }
}

createModelSchema(Phd, {
  oid: primitive(),
  firstName: primitive(),
  middleName: primitive(),
  lastName: primitive(),
  picture: primitive({
    default: ""
  }),
  pictureBlob: primitive({}),
  country: primitive(),
  city: primitive(),
  address: primitive(),
  pin: primitive(),
  email: primitive(),
  dissertationTopic: primitive(),
  enrollDate: primitive(),
  gradDate: primitive()
  // status: object(StatusPhd),
  // curriculum: object(),
  // supervisor: object(),
  // department: object(Department),
  // report: object(),
});
