"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptionsDoctoralCenterAdmin } from "@/config/doctoralCenter/admin/sideMenuOptionsDoctoralCenterAdmin";
import DoctoralCenterExamsGrid from "../_components/DoctoralCenterExamsGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Изпити"}
      MainView={<DoctoralCenterExamsGrid />}
      mainListItems={sideMenuOptionsDoctoralCenterAdmin}
    />
  );
}
