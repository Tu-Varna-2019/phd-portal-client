"use client";
import Layout from "@/components/main-layout/Layout";

import DoctoralCenterExamsGrid from "../_components/DoctoralCenterExamsGrid";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";

export default function Page() {
  return (
    <Layout
      headerTitle={"Изпити"}
      basePath={path}
      MainView={<DoctoralCenterExamsGrid />}
      mainListItems={sideMenu}
    />
  );
}
