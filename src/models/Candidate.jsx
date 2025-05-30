import { createModelSchema, object, primitive } from "serializr";
import Curriculum from "./Curriculum";
import File from "./File";

export default class Candidate {
  name;
  email;
  country;
  city;
  pin;
  postCode;
  address;
  faculty;
  yearAccepted;
  status;
  biography;
  curriculum;
}

createModelSchema(Candidate, {
  name: primitive(),
  email: primitive(),
  country: primitive(),
  city: primitive(),
  pin: primitive(),
  postCode: primitive(),
  address: primitive(),
  faculty: primitive(),
  yearAccepted: primitive(),
  status: primitive(),
  biography: object(File),
  curriculum: object(Curriculum)
});
