"use client";
import Layout from "@/components/main-layout/Layout";

import { path } from "../_constants/pathConstant";
import { sideMenu } from "../_constants/sideMenuConstants";
import NotificationsGrid from "@/app/(common)/notifications/_components/NotificationsGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Известия"}
      basePath={path}
      MainView={<NotificationsGrid />}
      mainListItems={sideMenu}
    />
  );
}
