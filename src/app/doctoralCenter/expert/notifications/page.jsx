"use client";
import Layout from "@/components/main-layout/Layout";
import { path } from "../_constants/pathConstant";
import NotificationsGrid from "@/app/(common)/notifications/_components/NotificationsGrid";
import { sideMenu } from "../_constants/sideMenuConstants";

export default function Page() {
  return (
    <Layout
      headerTitle={"Известия"}
      MainView={<NotificationsGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
