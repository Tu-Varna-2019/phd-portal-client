"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";
import UserManagementGrid from "../_components/UserManagementGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Управление на потребители"}
      MainView={UserManagementGrid}
      mainListItems={sideMenuOptions}
    />
  );
}
