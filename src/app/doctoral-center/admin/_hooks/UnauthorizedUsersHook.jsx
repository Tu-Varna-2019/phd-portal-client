import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import { useAppDispatch } from "@/features/constants";

import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import APIWrapper from "@/lib/helpers/APIWrapper";
import UnauthorizedUsers from "@/models/UnauthorizedUsers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UnauthorizedUsersColunms } from "../_constants/unauthorizedUsersColumns";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";

export default function UnauthorizedUsersHook() {
  const { logNotifyAlert, logAlert } = APIWrapper();
  const { setUnauthorizedUserGroup } = DoctoralCenterAdminAPI();
  const dispatch = useAppDispatch();
  const { tr } = Translate();

  const [unauthUsers, setUnauthUsers] = useState([]);
  const [docCenterRoles, setDoctorCenterRoles] = useState([]);

  const {
    getUnauthorizedUsers,
    setUnauthorizedUserIsAllowed,
    getDocCenterRoles
  } = DoctoralCenterAdminAPI();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupOption, setGroupOption] = useState("");

  const fetchUnauthorizedUsers = useCallback(async () => {
    setUnauthUsers(await getUnauthorizedUsers());
  }, []);

  const fetchDocCenterRoles = useCallback(async () => {
    setDoctorCenterRoles(await getDocCenterRoles());
  }, []);

  useEffect(() => {
    fetchUnauthorizedUsers();
    fetchDocCenterRoles();
    return runPeriodically(() => {
      fetchUnauthorizedUsers();
      fetchDocCenterRoles();
    });
  }, [fetchUnauthorizedUsers, fetchDocCenterRoles]);

  const docCenterRolesBG = useMemo(() => {
    return docCenterRoles.map((role) => tr(role));
  }, [docCenterRoles]);

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

  const onAutocompleteChange = (index, _) => {
    setGroupOption(docCenterRoles[index]);
  };

  const authorizeUsers = async (unauthorizedUsers) => {
    const normalizedUnauthUsers =
      UnauthorizedUsers.getServerFormatList(unauthorizedUsers);
    await setUnauthorizedUserGroup(normalizedUnauthUsers, groupOption);
  };

  const onButtonPermitOnClick = async () => {
    const unauthorizedUsers = unauthUsers.filter((elem) =>
      selectedUsers.includes(elem.id)
    );
    await authorizeUsers(unauthorizedUsers);

    const message = [];
    unauthorizedUsers.map((user) => {
      message.push(
        `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`
      );

      logNotifyAlert({
        title: "Потребител добавен в системата",
        description: `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`,
        message: `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`,
        action: `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`,
        level: "success",
        scope: "group",
        group: "admin"
      });
    });

    dispatch(
      setAlertBox({
        message: message.join("\r\n"),
        severity: "success"
      })
    );

    const permittedUsers = unauthUsers.filter(
      (elem) => !selectedUsers.includes(elem.id)
    );
    setUnauthUsers(permittedUsers);
  };

  return {
    setSelectedUsers,
    unauthUsers,
    columns,
    groupOption,
    onButtonPermitOnClick,
    onAutocompleteChange,
    docCenterRolesBG
  };
}
