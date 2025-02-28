import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import { useCallback, useEffect, useState } from "react";
import UnauthorizedUsers from "@/models/UnauthorizedUsers";
import APIWrapper from "@/lib/helpers/APIWrapper";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";
import { runPeriodically } from "@/lib/helpers/utils";
import { optionsEN } from "../_constants/unauthorizedUsersConstants";

export default function UnauthorizedUsersHook() {
  const { logNotifyAlert, logAlert } = APIWrapper();

  const [unauthUsers, setUnauthUsers] = useState([]);
  const { getUnauthorizedUsers, setUnauthorizedUserGroup } =
    DoctoralCenterAPI();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupOption, setGroupOption] = useState("");

  const fetchUnauthorizedUsers = useCallback(async () => {
    const unauthorizedUsers = await getUnauthorizedUsers();
    if (unauthorizedUsers != []) {
      setUnauthUsers(UnauthorizedUsers.getList(unauthorizedUsers));
    }
  }, []);

  useEffect(() => {
    fetchUnauthorizedUsers();
    return runPeriodically(() => {
      fetchUnauthorizedUsers();
    });
  }, [fetchUnauthorizedUsers]);

  const onAutocompleteChange = (index, _) => {
    setGroupOption(optionsEN[index]);
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
    onAutocompleteChange
  };
}
