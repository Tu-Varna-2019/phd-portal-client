"use client";
import Layout from "@/components/main-layout/Layout";

import { path } from "../_constants/pathConstant";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import NotificationsGrid from "@/app/(common)/_notifications/_components/NotificationsGrid";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { navigation } = SideMenuConstants();
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Известия")}
      basePath={path}
      MainView={<NotificationsGrid />}
      mainListItems={navigation}
    />
  );
}
