export default class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static fromGraphData(response) {
    return new User({
      id: 1,
      name: "John",
      email: response.graphData.account.username
    });
  }
}
