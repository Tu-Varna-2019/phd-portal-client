export default class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  setUser(props) {
    console.log(`Recived graphData for authenticated user: ${props}`);
    this.email = props.graphData.account.username;
  }
}
