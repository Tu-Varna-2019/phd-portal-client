"use client";
import Layout from "@/components/main-layout/Layout";

import DoctoralCenterExamsGrid from "../_components/DoctoralCenterExamsGrid";
import { sideMenuOptionsDoctoralCenter } from "@/components/config/doctoralCenter/manager-expert/sideMenuOptionsDoctoralCenter";

export default function Page() {
  return (
    <Layout
      headerTitle={"Изпити"}
      basePath={"/doctoralCenter"}
      MainView={<DoctoralCenterExamsGrid />}
      mainListItems={sideMenuOptionsDoctoralCenter}
    />
  );
}
