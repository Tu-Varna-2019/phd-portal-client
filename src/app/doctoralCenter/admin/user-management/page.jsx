"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptionsDoctoralCenterAdmin } from "@/config/doctoralCenter/admin/sideMenuOptionsDoctoralCenterAdmin";
import DoctoralCenterAdminUserManagementGrid from "../_components/DoctoralCenterAdminUserManagementGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Управление на потребители"}
      MainView={<DoctoralCenterAdminUserManagementGrid />}
      mainListItems={sideMenuOptionsDoctoralCenterAdmin}
    />
  );
}
