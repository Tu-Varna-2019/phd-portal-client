import { createModelSchema, object, primitive } from "serializr";
import StatusPhd from "./statusPhd";
import Department from "./Department";

export default class Phd {
  constructor({
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
    gradDate,
    status,
    // curriculum,
    // supervisor,
    department,
    report
  } = {}) {
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
    this.status = status;
    // this.curriculum = curriculum;
    // this.supervisor = supervisor;
    this.department = department;
    // this.report = report;
  }

  formatName(name) {
    return name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
  }

  extractName(name) {
    const nameArray = name.split(" ");
    this.firstName = this.formatName(nameArray[0]);
    this.middleName = this.formatName(nameArray[1]);
    this.lastName = this.formatName(nameArray[2]);
  }

  getName() {
    return String(this.firstName + " " + this.middleName + " " + this.lastName);
  }
}

createModelSchema(Phd, {
  oid: primitive(),
  firstName: primitive(),
  middleName: primitive(),
  lastName: primitive(),
  picture: primitive({
    default: "phd_image.png"
  }),
  country: primitive(),
  city: primitive(),
  address: primitive(),
  pin: primitive(),
  email: primitive(),
  dissertationTopic: primitive(),
  enrollDate: primitive(),
  gradDate: primitive(),
  status: object(StatusPhd),
  // curriculum: object(),
  // supervisor: object(),
  department: object(Department)
  // report: object(),
});
