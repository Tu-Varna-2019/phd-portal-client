"use client";
import { sideMenuOptionsDoctoralCenter } from "@/components/config/doctoralCenter/manager-admin/sideMenuOptionsDoctoralCenter";
import NotificationGrid from "@/components/main-layout/app/NotificationsGrid";
import Layout from "@/components/main-layout/Layout";

export default function Page() {
  return (
    <Layout
      headerTitle={"Известия"}
      MainView={<NotificationGrid />}
      mainListItems={sideMenuOptionsDoctoralCenter}
    />
  );
}
