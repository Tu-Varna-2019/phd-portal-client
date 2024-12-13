export default class User {
  constructor({ id = null, name = null, email = null } = {}) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  }

  static fromJSON(data) {
    return new User(data);
  }
}
