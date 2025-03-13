"use client";
import Layout from "@/components/main-layout/Layout";

import UserManagementGrid from "../_components/UserManagementGrid";
import { sideMenu } from "../_constants/sideMenuConstants";

import { path } from "../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("User management")}
      basePath={path}
      MainView={<UserManagementGrid />}
      mainListItems={sideMenu}
    />
  );
}
