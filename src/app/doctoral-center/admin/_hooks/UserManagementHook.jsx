import { useCallback, useEffect, useState } from "react";
import DoctoralCenterAdminAPI from "@/api/DoctoralCenterAdminAPI";

import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import UserManagementColunms from "../_constants/userManagementColumns";
import APIWrapper from "@/lib/helpers/APIWrapper";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";

export default function UserManagementHook() {
  const { logNotifyAlert, logAlert } = APIWrapper();
  const { deleteAuthorizedUser } = DoctoralCenterAdminAPI();
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const { getAuthorizedUsers } = DoctoralCenterAdminAPI();
  const [users, setUsers] = useState([]);

  const [menuAnchor, setMenuAnchor] = useState(false);
  const [openDialogBoxYesNo, setOpenDialogBoxYesNo] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const { tr, language } = Translate();

  const fetchAuthorizedUsers = useCallback(async () => {
    const authUsersRes = await getAuthorizedUsers();
    authUsersRes.forEach((user, index) => {
      user.id = index;
      user.group = tr(user.group);
    });

    setUsers(authUsersRes);
  }, [language]);

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
        setDialogTitle(tr("Deleting a user") + " " + selectedUser.name);
        setDialogContent(
          tr("Are you sure you want to delete users") +
            " " +
            selectedUser.name +
            " ?"
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
    const result = await deleteAuthorizedUser(
      selectedUser.oid,
      tr(selectedUser.group, "en")
    );

    if (result.status != "error") {
      logNotifyAlert({
        title: `Потребител ${selectedUser.name} е изтрит от системата`,
        description: `Потребителят ${selectedUser.name} е изтрит от в системата от роля: ${selectedUser.group}`,
        message:
          tr("the user") +
          " " +
          selectedUser.name +
          " " +
          tr("is deleted flom the system!"),
        action: `Потребител ${selectedUser.name} е изтрит от системата`,
        level: "success",
        scope: "group",
        group: "admin"
      });

      const updatedRows = users.filter((elem) => elem.oid !== selectedUser.oid);
      setUsers(updatedRows);
    } else {
      logAlert({
        message: tr(result.message),
        description: "Проблем при изтриване на удостоверен потребител",
        action: "Проблем при изтриване на удостоверен потребител",
        level: "error"
      });
    }
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
}
