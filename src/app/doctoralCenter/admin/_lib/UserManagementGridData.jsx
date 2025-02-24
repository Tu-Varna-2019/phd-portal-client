import { useEffect, useState } from "react";
import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";

import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { UserManagementColunms } from "../_constants/userManagementColumns";

export default function UserManagementGridData() {
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
    let interval;
    const getAuthUsers = async () => {
      setGetAuthorizedUsers(true);
      const authUsers = await fetchAutorizedUsers();

      if (authUsers != null) setRows(authUsers);
    };

    getAuthUsers();
    setGetAuthorizedUsers(false);
    interval = setInterval(() => {
      getAuthUsers();
      setGetAuthorizedUsers(false);
    }, process.env.NEXT_PUBLIC_FETCH_API_DURATION);
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
}
