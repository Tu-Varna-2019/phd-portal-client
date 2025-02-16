"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptionsDoctoralCenterAdmin } from "@/config/doctoralCenter/admin/sideMenuOptionsDoctoralCenterAdmin";
import DoctoralCenterAdminUnauthorizedUsersGrid from "../_components/DoctoralCenterAdminUnauthorizedUsersGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Неудостоверени потребители"}
      MainView={<DoctoralCenterAdminUnauthorizedUsersGrid />}
      mainListItems={sideMenuOptionsDoctoralCenterAdmin}
    />
  );
}
