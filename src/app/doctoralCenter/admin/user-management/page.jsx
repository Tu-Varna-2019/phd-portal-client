"use client";
import Layout from "@/components/main-layout/Layout";

import UserManagementGrid from "../_components/UserManagementGrid";
import { sideMenu } from "../_constants/sideMenuConstants";

import { path } from "../_constants/pathConstant";

export default function Page() {
  return (
    <Layout
      headerTitle={"Управление на потребители"}
      basePath={path}
      MainView={<UserManagementGrid />}
      mainListItems={sideMenu}
    />
  );
}
