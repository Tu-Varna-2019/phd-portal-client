"use client";
import Layout from "@/components/main-layout/Layout";
import { sideMenuOptionsDoctoralCenter } from "@/components/config/doctoralCenter/manager-expert/sideMenuOptionsDoctoralCenter";
import DoctoralCenterUnauthorizedUsersGrid from "../_components/DoctoralCenterUnauthorizedUsersGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Удостоверени потребители"}
      MainView={<DoctoralCenterUnauthorizedUsersGrid />}
      basePath={"/doctoralCenter"}
      mainListItems={sideMenuOptionsDoctoralCenter}
    />
  );
}
