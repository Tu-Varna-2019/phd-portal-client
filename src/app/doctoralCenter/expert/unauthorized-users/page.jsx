"use client";
import Layout from "@/components/main-layout/Layout";
import DoctoralCenterUnauthorizedUsersGrid from "../_components/DoctoralCenterUnauthorizedUsersGrid";
import { path } from "../_constants/pathConstant";
import { sideMenu } from "../_constants/sideMenuConstants";

export default function Page() {
  return (
    <Layout
      headerTitle={"Удостоверени потребители"}
      MainView={<DoctoralCenterUnauthorizedUsersGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
