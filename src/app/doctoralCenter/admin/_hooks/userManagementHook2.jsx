import { useEffect, useState } from "react";
import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";

import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { UserManagementColunms } from "../_constants/userManagementColumns";
import APIWrapper from "@/lib/helpers/APIWrapper";
import { runPeriodically } from "@/lib/helpers/utils";

export const UserManagementRowsHook = () => {
  const [rows, setRows] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(false);
  const [openDialogBoxYesNo, setOpenDialogBoxYesNo] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [getAuthorizedUsers, setGetAuthorizedUsers] = useState(false);

  const doctoralCenter = useSelector(selectDoctoralCenter);
  const { fetchAutorizedUsers } = DoctoralCenterAdminAPI();

  useEffect(() => {
    const getAuthUsers = async () => {
      setGetAuthorizedUsers(true);
      const authUsers = await fetchAutorizedUsers();

      if (authUsers != null) setRows(authUsers);
    };

    getAuthUsers();
    setGetAuthorizedUsers(false);
    runPeriodically(() => {
      getAuthUsers();
      setGetAuthorizedUsers(false);
    });
  }, [setRows]);

  const handleOpenMenu = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedUser(row);
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

  const menuItemDisabled = () => {
    return selectedUser?.oid == doctoralCenter.oid;
  };

  const { columns } = UserManagementColunms(
    menuAnchor,
    setMenuAnchor,
    handleOpenMenu,
    onMenuClick,
    menuItemDisabled
  );

  return {
    rows,
    columns,
    openDialogBoxYesNo,
    setOpenDialogBoxYesNo,
    columns,
    selectedUser,
    setRows,
    dialogTitle,
    dialogContent,
    getAuthorizedUsers
  };
};

export const UserManagementHook = () => {
  const {
    rows,
    dialogTitle,
    dialogContent,
    columns,
    openDialogBoxYesNo,
    setOpenDialogBoxYesNo,
    selectedUser,
    setRows,
    getAuthorizedUsers
  } = UserManagementRowsHook();

  const { logNotifyAlert } = APIWrapper();
  const { deleteAuthorizedUser } = DoctoralCenterAdminAPI();

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

    const updatedRows = rows.filter((elem) => elem.oid !== selectedUser.oid);
    setRows(updatedRows);
  };

  return {
    buttonConfirmOnClick,
    rows,
    getAuthorizedUsers,
    dialogTitle,
    dialogContent,
    columns,
    openDialogBoxYesNo,
    setOpenDialogBoxYesNo
  };
};
