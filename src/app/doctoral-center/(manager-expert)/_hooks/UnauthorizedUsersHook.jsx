import { useCallback, useEffect, useMemo, useState } from "react";
import Unauthorized from "@/models/Unauthorized";
import APIWrapper from "@/lib/helpers/APIWrapper";
import DoctoralCenterAPI from "@/api/DoctoralCenterAPI";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";

export default function UnauthorizedUsersHook() {
  const { logNotifyAlert } = APIWrapper();
  const [unauthUsers, setUnauthUsers] = useState([]);
  const { getUnauthorizedUsers, setUnauthorizedUserGroup, getDocCenterRoles } =
    DoctoralCenterAPI();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupOption, setGroupOption] = useState("");
  const { tr, language } = Translate();
  const [docCenterRoles, setDoctorCenterRoles] = useState([]);

  const fetchUnauthorizedUsers = useCallback(async () => {
    setUnauthUsers(await getUnauthorizedUsers());
  }, [language]);

  const fetchDocCenterRoles = useCallback(async () => {
    setDoctorCenterRoles(await getDocCenterRoles());
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
    await setUnauthorizedUserGroup(normalizedUnauthUsers, groupOption);
  };

  const onButtonPermitOnClick = async () => {
    const unauthorizedUsers = unauthUsers.filter((elem) =>
      selectedUsers.includes(elem.id)
    );
    await authorizeUsers(unauthorizedUsers);
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
