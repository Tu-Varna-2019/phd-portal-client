import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import { useAppDispatch } from "@/features/constants";

import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import APIWrapper from "@/lib/helpers/APIWrapper";
import UnauthorizedUsers from "@/models/UnauthorizedUsers";
import { useEffect, useState } from "react";
import { UnauthorizedUsersColunms } from "../_constants/unauthorizedUsersColumns";

export function UnauthorizedUsersRowsHook() {
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

export const UnauthorizedUsersHook = () => {
  const optionsEN = ["expert", "manager", "admin"];
  const optionsBG = ["експерт", "ръководител", "администратор"];

  const { rows, columns, setRowsByParam } = UnauthorizedUsersRowsHook();
  const [selectedRows, setSelectedRows] = useState([]);
  const [groupOption, setGroupOption] = useState("");
  const { setUnauthorizedUserGroup } = DoctoralCenterAdminAPI();
  const dispatch = useAppDispatch();

  const { logNotifyAlert } = APIWrapper();

  const onAutocompleteChange = (index, _) => {
    setGroupOption(optionsEN[index]);
  };

  const setGroups = async (unauthorizedUsers) => {
    const normalizedUnauthUsers =
      UnauthorizedUsers.getServerFormatList(unauthorizedUsers);

    await setUnauthorizedUserGroup(normalizedUnauthUsers, groupOption);
  };

  const onButtonPermitOnClick = async () => {
    const unauthorizedUsers = rows.filter((elem) =>
      selectedRows.includes(elem.id)
    );
    await setGroups(unauthorizedUsers);

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

    const permittedUsers = rows.filter(
      (elem) => !selectedRows.includes(elem.id)
    );
    setRowsByParam(permittedUsers);
  };

  return {
    rows,
    columns,
    onButtonPermitOnClick,
    onAutocompleteChange,
    setSelectedRows,
    optionsBG,
    groupOption
  };
};
