import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import APIWrapper from "@/lib/helpers/APIWrapper";

import UnauthorizedUsers from "@/models/UnauthorizedUsers";
import { useEffect, useState } from "react";
import { UnauthorizedUsersColunms } from "../_constants/unauthorizedUsersColumns";

export default function UnauthorizedUsersGridData() {
  const [rows, setRows] = useState([new UnauthorizedUsers()]);
  const { fetchUnauthorizedUsers, setUnauthorizedUserIsAllowed } =
    DoctoralCenterAdminAPI();
  const { logNotifyAlert, logAlert } = APIWrapper();

  useEffect(() => {
    let interval;
    const getUnauthorizedUsers = async () => {
      const unauthorizedUsers = await fetchUnauthorizedUsers();

      if (unauthorizedUsers != null) {
        setRows(UnauthorizedUsers.getList(unauthorizedUsers));
      }
    };

    getUnauthorizedUsers();
    interval = setInterval(() => {
      getUnauthorizedUsers();
    }, process.env.NEXT_PUBLIC_FETCH_API_DURATION);
  }, [setRows]);

  const setRowsByParam = (rows) => {
    setRows(rows);
  };

  const changeIsAllowedOnClick = async (oid, email, isAllowed) => {
    const result = await setUnauthorizedUserIsAllowed(oid, isAllowed);

    if (result != []) {
      const allowedMsg = isAllowed ? "позволен" : "забранен";

      logNotifyAlert({
        title: `Неудостоверен потребител ${allowedMsg} в системата`,
        description: `Неудостоверен потребител ${email} е ${allowedMsg} в системата`,
        message: `Неудостоверен потребител ${email} е ${allowedMsg} в системата`,
        action: `Неудостоверен потребител ${email} е ${allowedMsg} в системата`,
        level: "success",
        scope: "group",
        group: "admin"
      });
    } else {
      logAlert({
        message: `Проблем при сменяне на позволяване статуса на неудостоверен потребител`,
        description: `Проблем при сменяне на позволяване статуса на неудостоверен потребител`,
        action:
          "Пробем при смяна на позволяване статус неудостоверен потребител",
        level: "error"
      });
    }
  };

  const { columns } = UnauthorizedUsersColunms(changeIsAllowedOnClick);

  return {
    rows,
    columns,
    setRowsByParam
  };
}
