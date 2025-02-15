"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptionsDoctoralCenterAdmin } from "@/components/config/doctoralCenter/admin/sideMenuOptionsDoctoralCenterAdmin";
import DoctoralCenterHomeGrid from "./_components/DoctralCenterHomeGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Начална страница"}
      MainView={<DoctoralCenterHomeGrid />}
      mainListItems={sideMenuOptionsDoctoralCenterAdmin}
    />
  );
}
