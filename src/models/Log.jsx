import LogsAPI from "@/lib/api/logs";

export default class Log {
  constructor({ description, action, level }) {
    this.description = description;
    this.timestamp = new Date().toISOString();
    this.action = action;
    this.level = level;

    this.user = {
      oid: "",
      name: "",
      email: "",
      group: ""
    };
  }

  setUser({ oid, name, email, group }) {
    this.user = {
      oid: oid,
      name: name,
      email: email,
      group: group
    };
  }

  static info(description, action) {
    const level = "INFO";

    const log = new Log(description, action, level);
    const { saveLog } = LogsAPI();

    saveLog(log);
  }
}
