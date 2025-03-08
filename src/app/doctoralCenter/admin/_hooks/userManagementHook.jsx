import { useCallback, useEffect, useState } from "react";
import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";

import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { UserManagementColunms } from "../_constants/userManagementColumns";
import APIWrapper from "@/lib/helpers/APIWrapper";
import { runPeriodically } from "@/lib/helpers/utils";
import { useTranslation } from "react-i18next";

export const UserManagementHook = () => {
  const { logNotifyAlert } = APIWrapper();
  const { deleteAuthorizedUser } = DoctoralCenterAdminAPI();
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const { getAuthorizedUsers } = DoctoralCenterAdminAPI();
  const [users, setUsers] = useState([]);

  const [menuAnchor, setMenuAnchor] = useState(false);
  const [openDialogBoxYesNo, setOpenDialogBoxYesNo] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const { t, ready } = useTranslation("client-page");

  const fetchAuthorizedUsers = useCallback(async () => {
    const authUsersRes = await getAuthorizedUsers();
    authUsersRes.forEach((user, index) => {
      user.id = index;
      user.group = ready ? t(user.group) : user.group;
    });
    setUsers(authUsersRes);
  }, []);

  useEffect(() => {
    fetchAuthorizedUsers();
    return runPeriodically(() => {
      fetchAuthorizedUsers();
    });
  }, [fetchAuthorizedUsers]);

  const handleOpenMenu = (event, user) => {
    setMenuAnchor(event.currentTarget);
    setSelectedUser(user);
  };

  const onMenuClick = (option) => {
    switch (option) {
      case "delete":
        setDialogTitle(`Изтриване на потребител: ${selectedUser.name} `);
        setDialogContent(
          `Сигурни ли сте че искате да изтриете потребитеря: ${selectedUser.name} ?`
        );
        setOpenDialogBoxYesNo(true);
        setMenuAnchor(false);
        break;

      default:
        console.error("Menu option not found!!");
        break;
    }
  };

  const { columns } = UserManagementColunms(
    menuAnchor,
    setMenuAnchor,
    selectedUser?.oid,
    doctoralCenter.oid,
    handleOpenMenu,
    onMenuClick
  );

  const buttonConfirmOnClick = async () => {
    await deleteAuthorizedUser(selectedUser.oid, selectedUser.role);

    logNotifyAlert({
      title: `Потребител ${selectedUser.name} е изтрит от системата`,
      description: `Потребителят ${selectedUser.name} е изтрит от в системата от роля: ${selectedUser.role}`,
      message: `Потребител ${selectedUser.name} е изтрит от системата`,
      action: `Потребител ${selectedUser.name} е изтрит от системата`,
      level: "success",
      scope: "group",
      group: "admin"
    });

    const updatedRows = users.filter((elem) => elem.oid !== selectedUser.oid);
    setUsers(updatedRows);
  };

  return {
    buttonConfirmOnClick,
    users,
    dialogTitle,
    dialogContent,
    columns,
    openDialogBoxYesNo,
    setOpenDialogBoxYesNo
  };
};
