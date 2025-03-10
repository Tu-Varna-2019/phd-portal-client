"use client";
import Layout from "@/components/main-layout/Layout";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import ContestsGrid from "../_components/ContestsGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Обявяване на конкурси"}
      MainView={<ContestsGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
