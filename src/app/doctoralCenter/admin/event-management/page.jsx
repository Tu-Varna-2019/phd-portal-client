"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";
import EventManagementGrid from "../_components/EventManagementGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Управление на събития"}
      MainView={<EventManagementGrid />}
      mainListItems={sideMenuOptions}
    />
  );
}
