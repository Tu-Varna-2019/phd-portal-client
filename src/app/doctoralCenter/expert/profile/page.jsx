"use client";
import Layout from "@/components/main-layout/Layout";

import ProfileGrid from "@/app/(common)/profile/_components/ProfileGrid";
import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { setDoctoralCenter } from "@/features/user/slices/userSlice";
import { sideMenuOptionsDoctoralCenter } from "@/config/doctoralCenter/manager-expert/sideMenuOptionsDoctoralCenter";

export default function Page() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const doctoralCenterRoleLangMappings = {
    expert: "Експерт",
    manager: "Ръководител"
  };

  const nameFields = ["Име", "Имейл"];
  const user = {
    name: doctoralCenter.name,
    email: doctoralCenter.email,
    picture: doctoralCenter.picture,
    pictureBlob: doctoralCenter.pictureBlob,
    role: doctoralCenterRoleLangMappings[doctoralCenter.role.role]
  };

  return (
    <Layout
      headerTitle={"Профил"}
      basePath={"/doctoralCenter"}
      MainView={
        <ProfileGrid
          user={user}
          nameFields={nameFields}
          setUser={setDoctoralCenter}
        />
      }
      mainListItems={sideMenuOptionsDoctoralCenter}
    />
  );
}
