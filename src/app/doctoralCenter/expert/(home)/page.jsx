"use client";
import Layout from "@/components/main-layout/Layout";

import DoctoralCenterHomeGrid from "../_components/DoctralCenterHomeGrid";
import { sideMenuOptionsDoctoralCenter } from "@/components/config/doctoralCenter/manager-expert/sideMenuOptionsDoctoralCenter";
import { path } from "../_constants/pathConstant";
import { sideMenu } from "../_constants/sideMenuConstants";

export default function Page() {
  return (
    <Layout
      headerTitle={"Начална страница"}
      basePath={path}
      MainView={<DoctoralCenterHomeGrid />}
      mainListItems={sideMenu}
    />
  );
}
