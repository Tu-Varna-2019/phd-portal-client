"use client";
import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";
import NotificationGrid from "@/components/main-layout/app/NotificationsGrid";
import Layout from "@/components/main-layout/Layout";

export default function Page() {
  return (
    <Layout
      headerTitle={"Известия"}
      MainView={NotificationGrid}
      mainListItems={sideMenuOptions}
    />
  );
}
