import { useCallback, useEffect, useState } from "react";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import CommitteeAPI from "@/lib/api/CommitteeAPI";
import APIWrapper from "@/lib/helpers/APIWrapper";
import { useSelector } from "react-redux";
import { selectCommittee } from "@/lib/features/user/slices/userMemoSelector";

export default function CommissionsHook() {
  const { language, tr } = Translate();

  const { logNotifyAlert } = APIWrapper();
  const signedCommittee = useSelector(selectCommittee);
  const {
    createCommission,
    modifyCommission,
    getCommissions,
    getCommittees,
    deleteCommission
  } = CommitteeAPI();

  const [commissions, setCommisions] = useState();
  const [allCommittees, setAllCommittees] = useState();

  const [newCommissionName, setNewCommissionName] = useState();

  const [selectedCommission, setSelectedCommission] = useState({});
  const [selectedCommittees, setSelectedCommittees] = useState({});

  const [isCommissionOpened, setIsCommissionOpened] = useState(false);
  const [isModifyCommissionOpened, setIsModifyCommissionOpened] =
    useState(false);
  const [isCreateCommissionOpened, setIsCreateCommissionOpened] =
    useState(false);

  const [openConfirmCreateDialogYesNo, setOpenConfirmCreateDialogYesNo] =
    useState(false);
  const [openConfirmModifyDialogYesNo, setOpenConfirmModifyDialogYesNo] =
    useState(false);
  const [openConfirmDeleteDialogYesNo, setOpenConfirmDeleteDialogYesNo] =
    useState(false);

  const fetchCommissions = useCallback(async () => {
    const commissionsResponse = await getCommissions();
    commissionsResponse.forEach((commission, index) => {
      commission.id = index;
      commission.faculty = tr(commission.faculty);

      commission.committees.forEach((committee, index) => {
        committee.id = index;
        committee.role = tr(committee.role);
      });
    });

    setCommisions(commissionsResponse);
  }, [language]);

  //TODO: Fetch only when needed (when user is in modify or create state)
  const fetchAllCommittees = useCallback(async () => {
    if (signedCommittee.role.role == "chairman") {
      const committeesResponse = await getCommittees();
      committeesResponse.forEach((committee, index) => {
        committee.id = index;
        committee.role = tr(committee.role);
      });
      committeesResponse.sort(
        (prevCommittee, currCommittee) => prevCommittee.id > currCommittee.id
      );

      setAllCommittees(committeesResponse);
    }
  }, [language]);

  useEffect(() => {
    fetchCommissions();
    fetchAllCommittees();
    return runPeriodically(() => {
      fetchCommissions();
      fetchAllCommittees();
    });
  }, [fetchCommissions, fetchAllCommittees]);

  useEffect(() => {
    if (!isModifyCommissionOpened || selectedCommission == null) {
      return;
    }
    setNewCommissionName(selectedCommission.name);

    const selectedCommitteesOids = [];
    selectedCommission.committees.forEach((committee) =>
      selectedCommitteesOids.push(committee.oid)
    );

    const selectedCommitteesIDs = [];
    allCommittees
      .filter((committee) => selectedCommitteesOids.includes(committee.oid))
      .forEach((committee) => {
        selectedCommitteesIDs.push(committee.id);
      });

    setSelectedCommittees(selectedCommitteesIDs);
  }, [isModifyCommissionOpened, selectedCommission]);

  useEffect(() => {
    if (!isCreateCommissionOpened || selectedCommission == null) {
      return;
    }
    setNewCommissionName("");
    setSelectedCommittees([]);
  }, [isCreateCommissionOpened, selectedCommission]);

  const onCreateCommissionOnClick = async () => {
    const committees = allCommittees.filter((elem) =>
      selectedCommittees.includes(elem.id)
    );
    committees.push({ oid: signedCommittee.oid });

    await createCommission(newCommissionName, committees);

    logNotifyAlert({
      title:
        `Член от комитета: ${signedCommittee.name} създаде комитет: ` +
        selectedCommission.name,
      description:
        `Член от комитета: ${signedCommittee.name} създаде комитет: ` +
        selectedCommission.name,
      message:
        tr("You have successfully") +
        " " +
        tr("created") +
        " " +
        tr("commission") +
        " " +
        selectedCommission.name,
      action:
        `Потребителят ${signedCommittee.name} създаде комитет: ` +
        selectedCommission.name,
      level: "success",
      scope: "group",
      group: "committee"
    });
  };

  const onModifyCommissionOnClick = async () => {
    const committeesOids = allCommittees.filter((elem) =>
      selectedCommittees.includes(elem.id)
    );
    committeesOids.push({ oid: signedCommittee.oid });

    await modifyCommission({
      name: selectedCommission.name,
      newName: newCommissionName,
      committeOids: committeesOids
    });

    logNotifyAlert({
      title:
        `Член от комитета: ${signedCommittee.name} промени комитет: ` +
        selectedCommission.name,
      description:
        `Член от комитета: ${signedCommittee.name} промени комитет: ` +
        selectedCommission.name,
      message:
        tr("You have successfully") +
        " " +
        tr("modified") +
        " " +
        tr("commission") +
        " " +
        selectedCommission.name,
      action:
        `Потребителят ${signedCommittee.name} промени комитет: ` +
        selectedCommission.name,
      level: "success",
      scope: "group",
      group: "committee"
    });
  };

  const onDeleteCommissionOnClick = async () => {
    await deleteCommission(selectedCommission.name);

    logNotifyAlert({
      title:
        `Член от комитета: ${signedCommittee.name} изтри комитет: ` +
        selectedCommission.name,
      description:
        `Член от комитета: ${signedCommittee.name} изтри комитет: ` +
        selectedCommission.name,
      message:
        tr("You have successfully") +
        " " +
        tr("deleted") +
        " " +
        tr("commission") +
        " " +
        selectedCommission.name,
      action:
        `Потребителят ${signedCommittee.name} изтри комитет: ` +
        selectedCommission.name,
      level: "success",
      scope: "group",
      group: "committee"
    });
  };

  return {
    signedCommittee,
    commissions,
    selectedCommission,
    setSelectedCommission,
    newCommissionName,
    setNewCommissionName,
    onCreateCommissionOnClick,
    onModifyCommissionOnClick,
    isCommissionOpened,
    setIsCommissionOpened,
    isModifyCommissionOpened,
    setIsModifyCommissionOpened,
    isCreateCommissionOpened,
    setIsCreateCommissionOpened,
    allCommittees,
    selectedCommittees,
    setSelectedCommittees,
    openConfirmCreateDialogYesNo,
    setOpenConfirmCreateDialogYesNo,
    onDeleteCommissionOnClick,
    openConfirmModifyDialogYesNo,
    setOpenConfirmModifyDialogYesNo,
    openConfirmDeleteDialogYesNo,
    setOpenConfirmDeleteDialogYesNo
  };
}
