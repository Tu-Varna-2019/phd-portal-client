import { useCallback, useEffect, useMemo, useState } from "react";
import Unauthorized from "@/models/Unauthorized";
import APIWrapper from "@/lib/helpers/APIWrapper";
import DoctoralCenterAPI from "@/api/DoctoralCenterAPI";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";

export default function UnauthorizedUsersHook() {
  const { tr, language } = Translate();
  const { logNotifyAlert, logAlert } = APIWrapper();
  const { getUnauthorizedUsers, setUnauthorizedUserGroup, getDocCenterRoles } =
    DoctoralCenterAPI();

  const [unauthUsers, setUnauthUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [docCenterRoles, setDoctorCenterRoles] = useState([]);
  const [groupOption, setGroupOption] = useState("");

  const fetchUnauthorizedUsers = useCallback(async () => {
    const unauthUsers = await getUnauthorizedUsers();
    if (unauthUsers.status == "error") {
      logAlert({
        message: tr(unauthUsers.message),
        description: "Проблем при извличането на неудостоверени потребители!",
        action: "Проблем при извличането на неудостоверени потребители!",
        level: "error"
      });
    } else {
      setUnauthUsers(unauthUsers);
    }
  }, [language]);

  const fetchDocCenterRoles = useCallback(async () => {
    const docCenterRolesRes = await getDocCenterRoles();

    if (docCenterRolesRes.status == "error") {
      logAlert({
        message: tr(docCenterRolesRes.message),
        description: "Проблем при извличането на неудостоверени потребители!",
        action: "Проблем при извличането на неудостоверени потребители!",
        level: "error"
      });
    } else {
      setDoctorCenterRoles(docCenterRolesRes);
    }
  }, [language]);

  useEffect(() => {
    fetchUnauthorizedUsers();
    fetchDocCenterRoles();
    return runPeriodically(() => {
      fetchUnauthorizedUsers();
      fetchDocCenterRoles();
    });
  }, [fetchUnauthorizedUsers, fetchDocCenterRoles]);

  const docCenterRolesOptions = useMemo(() => {
    return docCenterRoles.map((role) => tr(role));
  }, [docCenterRoles]);

  const onAutocompleteChange = (value) => {
    setGroupOption(value);
  };

  const authorizeUsers = async (unauthorizedUsers) => {
    const normalizedUnauthUsers =
      Unauthorized.getServerFormatList(unauthorizedUsers);
    return await setUnauthorizedUserGroup(
      normalizedUnauthUsers,
      tr(groupOption, "en")
    );
  };

  const onButtonPermitOnClick = async () => {
    const unauthorizedUsers = unauthUsers.filter((elem) =>
      selectedUsers.includes(elem.id)
    );
    const result = await authorizeUsers(unauthorizedUsers);
    if (result.status == "success") {
      unauthorizedUsers.map((user) => {
        logNotifyAlert({
          title: "Потребител добавен в системата",
          description: `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`,
          message:
            tr("the user") +
            " " +
            user.email +
            " " +
            tr("is added into the system as group") +
            " " +
            groupOption,
          action: `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`,
          level: "success",
          scope: "group",
          group: "admin"
        });
      });
    } else {
      logAlert({
        message: tr(result.message),
        description: `Проблем при задаването на потребител в група: ${groupOption}`,
        action: `Проблем при задаването на потребител в група: ${groupOption}`,
        level: "error"
      });
    }
  };

  return {
    unauthUsers,
    groupOption,
    onButtonPermitOnClick,
    onAutocompleteChange,
    setSelectedUsers,
    docCenterRolesBG: docCenterRolesOptions
  };
}
