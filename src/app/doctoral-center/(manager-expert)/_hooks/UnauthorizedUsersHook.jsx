import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import UnauthorizedUsers from "@/models/UnauthorizedUsers";
import APIWrapper from "@/lib/helpers/APIWrapper";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import { runPeriodically } from "@/lib/helpers/utils";
import { useAppDispatch } from "@/lib/features/constants";
import { useTranslation } from "react-i18next";

export default function UnauthorizedUsersHook() {
  const { logNotifyAlert } = APIWrapper();
  const [unauthUsers, setUnauthUsers] = useState([]);
  const { getUnauthorizedUsers, setUnauthorizedUserGroup, getDocCenterRoles } =
    DoctoralCenterAPI();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupOption, setGroupOption] = useState("");
  const dispatch = useAppDispatch();

  const { t, ready } = useTranslation("client-page");
  const [docCenterRoles, setDoctorCenterRoles] = useState([]);

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
    return docCenterRoles.map((role) => (ready ? t(role) : role));
  }, [docCenterRoles]);

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
  };

  return {
    unauthUsers,
    groupOption,
    onButtonPermitOnClick,
    onAutocompleteChange,
    setSelectedUsers,
    docCenterRolesBG
  };
}
