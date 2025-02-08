"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";

export default function Page() {
  return (
    <Layout
      headerTitle={"Управление на събития"}
      // MainView={EventManagementGrid}
      mainListItems={sideMenuOptions}
    />
  );
}
