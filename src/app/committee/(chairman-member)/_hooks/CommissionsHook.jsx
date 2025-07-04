import { useCallback, useEffect, useState } from "react";
import { runPeriodically } from "@/lib/helpers/utils";
import Translate from "@/lib/helpers/Translate";
import CommitteeAPI from "@/lib/api/committee";
import APIWrapper from "@/lib/helpers/APIWrapper";
import { useSelector } from "react-redux";
import { selectCommittee } from "@/lib/features/user/slices/userMemoSelector";

export default function CommissionsHook() {
  const { language, tr } = Translate();

  const { logNotifyAlert } = APIWrapper();
  const signedCommittee = useSelector(selectCommittee);
  const { createCommission, modifyCommission, getCommissions } = CommitteeAPI();

  const [commissions, setCommisions] = useState();
  const [newCommissionName, setNewCommissionName] = useState();

  const [selectedCommission, setSelectedCommission] = useState({});
  const [isCommissionOpened, setIsCommissionOpened] = useState(false);
  const [isModifyCommissionOpened, setIsModifyCommissionOpened] =
    useState(false);
  const [isCreateCommissionOpened, setIsCreateCommissionOpened] =
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

  useEffect(() => {
    fetchCommissions();
    return runPeriodically(() => {
      fetchCommissions();
    });
  }, [fetchCommissions]);

  const onCreateCommissionOnClick = async () => {
    await createCommission(
      selectedCommission.name,
      selectedCommission.committees
    );

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
    await modifyCommission(
      selectedCommission.name,
      newCommissionName,
      selectedCommission.committees
    );
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
    setIsCreateCommissionOpened
  };
}
