import { useSelector } from "react-redux";
import selectSessionToken from "../features/sessionToken/slices/sessionTokenMemoSelector";
import selectDoctoralCenter from "../features/doctoralCenter/slices/doctoralCenterMemoSelector";
import selectPhd from "../features/phd/slices/phdMemoSelector";
import selectCommittee from "../features/committee/slices/committeeMemoSelector";
const API_URL = "/api/logs";

export default function LogsAPI() {
  const sessionToken = useSelector(selectSessionToken);

  const saveLog = (log) => {
    const user = getUserByGroup(sessionToken.group);
    let group = sessionToken.group;

    // NOTE: change the group to role specific only for doctoralCenter
    if (group == "doctoralCenter") group = user.role.role;

    if (user != null && group != "admin") {
      log.setUser({
        oid: user.oid,
        name: user.name,
        email: user.email,
        group: group
      });

      try {
        fetch(API_URL, {
          method: "POST",
          headers: {
            Authorization: sessionToken.accessToken
          },
          body: JSON.stringify(log)
        });
      } catch (exception) {
        console.error(`Server error when trying to log in ${exception}`);
      }
    }
  };

  const getUserByGroup = (group) => {
    switch (group) {
      case "doctoralCenter":
        const doctoralCenter = useSelector(selectDoctoralCenter);
        return doctoralCenter;

      case "phd":
        const phd = useSelector(selectPhd);
        return phd;

      case "committee":
        const committee = useSelector(selectCommittee);
        return committee;

      default:
        console.error(`Such group doesn't exist: ${group}`);
        break;
    }
  };

  return {
    saveLog
  };
}
