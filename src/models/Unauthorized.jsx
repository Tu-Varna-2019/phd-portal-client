import { formatToServerTimestamp } from "@/helpers/utils";

export default class Unauthorized {
  static getServerFormatList(unauthUsers) {
    return unauthUsers.map((user) => ({
      oid: user.oid,
      name: user.name,
      email: user.email,
      timestamp: formatToServerTimestamp(user.timestamp)
    }));
  }
}
