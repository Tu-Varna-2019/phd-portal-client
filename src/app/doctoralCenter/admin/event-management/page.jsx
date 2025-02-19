"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptionsDoctoralCenterAdmin } from "@/config/doctoralCenter/admin/sideMenuOptionsDoctoralCenterAdmin";
import DoctoralCenterAdminEventManagementGrid from "../_components/DoctoralCenterAdminEventManagementGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Управление на събития"}
      basePath={"/doctoralCenter/admin"}
      MainView={<DoctoralCenterAdminEventManagementGrid />}
      mainListItems={sideMenuOptionsDoctoralCenterAdmin}
    />
  );
}
