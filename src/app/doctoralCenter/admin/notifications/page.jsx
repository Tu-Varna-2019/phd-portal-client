"use client";
import { sideMenuOptionsDoctoralCenterAdmin } from "@/config/doctoralCenter/admin/sideMenuOptionsDoctoralCenterAdmin";
import NotificationGrid from "@/components/main-layout/app/NotificationsGrid";
import Layout from "@/components/main-layout/Layout";

export default function Page() {
  return (
    <Layout
      headerTitle={"Известия"}
      basePath={"/doctoralCenter/admin"}
      MainView={<NotificationGrid />}
      mainListItems={sideMenuOptionsDoctoralCenterAdmin}
    />
  );
}
