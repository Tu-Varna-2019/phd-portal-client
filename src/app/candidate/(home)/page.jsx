"use client";
import Layout from "@/components/main-layout/Layout";
import HomeGrid from "../_components/HomeGrid";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";

export default function Page() {
  return (
    <Layout
      headerTitle={"Начална страница"}
      MainView={<HomeGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
