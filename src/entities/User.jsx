export default class User {
  constructor({ id = null, name = null, email = null }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
