export default class User {
  constructor({
    id,
    firstName = null,
    middleName = null,
    lastName = null,
    email,
    accessToken
  } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.accessToken = accessToken;
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      email: this.email,
      accessToken: this.accessToken
    };
  }

  static fromJSON(data) {
    return new User(data);
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
