"use client";
import Layout from "@/components/main-layout/Layout";

import DoctoralCenterHomeGrid from "../_components/DoctralCenterHomeGrid";
import { sideMenuOptionsDoctoralCenter } from "@/components/config/doctoralCenter/manager-expert/sideMenuOptionsDoctoralCenter";

export default function Page() {
  return (
    <Layout
      headerTitle={"Начална страница"}
      MainView={<DoctoralCenterHomeGrid />}
      mainListItems={sideMenuOptionsDoctoralCenter}
    />
  );
}
