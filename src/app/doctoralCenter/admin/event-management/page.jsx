"use client";
import Layout from "@/components/main-layout/Layout";

import EventManagementGrid from "../_components/EventManagementGrid";
import { sideMenu } from "../_constants/sideMenuConstants";

import { path } from "../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Event Management")}
      basePath={path}
      MainView={<EventManagementGrid />}
      mainListItems={sideMenu}
    />
  );
}
