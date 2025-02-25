"use client";
import NotificationGrid from "@/components/main-layout/app/NotificationsGrid";
import Layout from "@/components/main-layout/Layout";

import { path } from "../_constants/pathConstant";
import { sideMenu } from "../_constants/sideMenuConstants";

export default function Page() {
  return (
    <Layout
      headerTitle={"Известия"}
      basePath={path}
      MainView={<NotificationGrid />}
      mainListItems={sideMenu}
    />
  );
}
