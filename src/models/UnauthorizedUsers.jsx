import { createModelSchema, date, deserialize, primitive } from "serializr";
import { formatDateTime, formatToServerTimestamp } from "@/helpers/utils";

export default class UnauthorizedUsers {
  #id = 0;
  oid;
  name;
  email;
  role;
  timestamp;
  #formattedTimestamp;

  constructor(oid, name, email, role, timestamp) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.role = role;
    this.timestamp = timestamp;
  }

  static getList(unauthUsers) {
    return unauthUsers.map((user) => deserialize(UnauthorizedUsers, user));
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  get formattedTimestamp() {
    return this.#formattedTimestamp;
  }

  set formattedTimestamp(timestamp) {
    this.#formattedTimestamp = formatDateTime(timestamp);
  }

  static getList(unauthUsers) {
    return unauthUsers.map((user, index) => {
      const result = deserialize(UnauthorizedUsers, user);
      result.id = index;
      result.formattedTimestamp = user.timestamp;

      return result;
    });
  }

  static getServerFormatList(unauthUsers) {
    return unauthUsers.map((user) => ({
      oid: user.oid,
      name: user.name,
      email: user.email,
      timestamp: formatToServerTimestamp(user.timestamp)
    }));
  }
}

createModelSchema(UnauthorizedUsers, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  role: primitive(),
  timestamp: date()
});
