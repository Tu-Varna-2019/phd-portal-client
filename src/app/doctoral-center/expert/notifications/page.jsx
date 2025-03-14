"use client";
import Layout from "@/components/main-layout/Layout";
import { path } from "../_constants/pathConstant";
import NotificationsGrid from "@/app/(common)/_notifications/_components/NotificationsGrid";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();

  return (
    <Layout
      headerTitle={tr("Notifications")}
      MainView={<NotificationsGrid />}
      basePath={path}
      mainListItems={navigation}
    />
  );
}
