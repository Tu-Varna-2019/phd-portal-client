import { useCallback, useEffect, useState } from "react";
import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";

import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { UserManagementColunms } from "../_constants/userManagementColumns";
import APIWrapper from "@/lib/helpers/APIWrapper";
import { runPeriodically } from "@/lib/helpers/utils";

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

  const fetchAuthorizedUsers = useCallback(async () => {
    const authUsers = await getAuthorizedUsers();
    if (authUsers != []) setUsers(authUsers);
  }, []);

  useEffect(() => {
    fetchAuthorizedUsers();
    runPeriodically(() => {
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

  const amISelected = () => {
    return selectedUser?.oid == doctoralCenter.oid;
  };

  const { columns } = UserManagementColunms(
    menuAnchor,
    setMenuAnchor,
    handleOpenMenu,
    onMenuClick,
    amISelected
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
