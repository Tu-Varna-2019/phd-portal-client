"use client";
import { sideMenuOptionsDoctoralCenter } from "@/config/doctoralCenter/manager-expert/sideMenuOptionsDoctoralCenter";
import NotificationGrid from "@/components/main-layout/app/NotificationsGrid";
import Layout from "@/components/main-layout/Layout";

export default function Page() {
  return (
    <Layout
      headerTitle={"Известия"}
      MainView={<NotificationGrid />}
      basePath={"/doctoralCenter"}
      mainListItems={sideMenuOptionsDoctoralCenter}
    />
  );
}
