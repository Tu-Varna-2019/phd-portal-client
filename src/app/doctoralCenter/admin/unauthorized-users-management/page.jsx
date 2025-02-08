"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";
import UnauthorizedUsersGrid from "../_components/UnauthorizedUsersGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Неудостоверени потребители"}
      MainView={<UnauthorizedUsersGrid />}
      mainListItems={sideMenuOptions}
    />
  );
}
