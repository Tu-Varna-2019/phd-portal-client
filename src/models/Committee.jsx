import { createModelSchema, object, primitive } from "serializr";
import CommitteeType from "./CommitteeType";
import Department from "./Department";

export default class Committee {
  constructor({ oid, name, email, grade, department, committeeType } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.grade = grade;
    this.department = department;
    this.committeeType = committeeType;
  }
}

createModelSchema(Committee, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  grade: primitive(),
  department: object(Department),
  committeeType: object(CommitteeType)
});
