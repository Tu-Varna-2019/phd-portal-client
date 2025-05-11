import { useCallback, useEffect, useState } from "react";

import APIWrapper from "@/lib/helpers/APIWrapper";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import DoctoralCenterAPI from "@/lib/api/doctoralCenter";

export default function CandidatesHook() {
  const { logNotifyAlert } = APIWrapper();
  const { getCandidates } = DoctoralCenterAPI();
  const [candidates, setCandidates] = useState([]);

  const [menuAnchor, setMenuAnchor] = useState(false);
  const [openDialogBoxYesNo, setOpenDialogBoxYesNo] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const { tr, language } = Translate();

  const fetchCandidates = useCallback(async () => {
    const candidatesRes = await getCandidates(
      "name,status,email,pin,post_code,country,city,address,faculty,biography,post_code,curriculum"
    );
    candidatesRes.forEach((user, index) => {
      user.id = index;
      user.curriculum = tr(user.curriculum);
    });

    setCandidates(candidatesRes.filter((user) => user.status == "waiting"));
  }, [language]);

  useEffect(() => {
    fetchCandidates();
    return runPeriodically(() => {
      fetchCandidates();
    });
  }, [fetchCandidates]);

  const buttonConfirmOnClick = async () => {
    await deleteAuthorizedUser(selectedUser.oid, tr(selectedUser.group, "en"));

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
  };

  return {
    candidates,
    buttonConfirmOnClick,
    openDialogBoxYesNo,
    dialogTitle,
    dialogContent,
    setOpenDialogBoxYesNo
  };
}
