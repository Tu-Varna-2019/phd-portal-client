"use client";
import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";
import Layout from "@/components/main-layout/Layout";
import HomeDoctoralCenterGrid from "./_components/HomeDoctralCenterGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Начална страница"}
      MainView={<HomeDoctoralCenterGrid />}
      mainListItems={sideMenuOptions}
    />
  );
}
