"use client";
import Layout from "@/components/main-layout/Layout";
import { sideMenuOptionsDoctoralCenter } from "@/components/config/doctoralCenter/manager-expert/sideMenuOptionsDoctoralCenter";
import DoctoralCenterAuthorizedUsersGrid from "../_components/DoctoralCenterAuthorizedUsersGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Удостоверени потребители от администратора"}
      MainView={DoctoralCenterAuthorizedUsersGrid()}
      mainListItems={sideMenuOptionsDoctoralCenter}
    />
  );
}
