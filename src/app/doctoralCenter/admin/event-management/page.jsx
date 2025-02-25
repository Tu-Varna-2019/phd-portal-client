"use client";
import Layout from "@/components/main-layout/Layout";

import EventManagementGrid from "../_components/EventManagementGrid";
import { sideMenu } from "../_constants/sideMenuConstants";

import { path } from "../_constants/pathConstant";

export default function Page() {
  return (
    <Layout
      headerTitle={"Управление на събития"}
      basePath={path}
      MainView={<EventManagementGrid />}
      mainListItems={sideMenu}
    />
  );
}
