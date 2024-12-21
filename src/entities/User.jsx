export default class User {
  constructor({ oid, name, email, accessToken } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.accessToken = accessToken;
  }

  toJSON() {
    return {
      oid: this.oid,
      name: this.name,
      email: this.email,
      accessToken: this.accessToken
    };
  }

  static fromJSON(data) {
    return new User(data);
  }

  // TODO: move it to phd class
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
