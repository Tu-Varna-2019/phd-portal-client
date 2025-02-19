"use client";
import { sideMenuOptionsDoctoralCenterAdmin } from "@/config/doctoralCenter/admin/sideMenuOptionsDoctoralCenterAdmin";
import Layout from "@/components/main-layout/Layout";
import DoctoralCenterAdminHomeGrid from "../_components/DoctoralCenterAdminHomeGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Начална страница"}
      MainView={<DoctoralCenterAdminHomeGrid />}
      basePath={"/doctoralCenter/admin"}
      mainListItems={sideMenuOptionsDoctoralCenterAdmin}
    />
  );
}
