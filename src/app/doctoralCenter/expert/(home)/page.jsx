"use client";
import Layout from "@/components/main-layout/Layout";

import HomeGrid from "../_components/HomeGrid";
import { path } from "../_constants/pathConstant";
import { sideMenu } from "../_constants/sideMenuConstants";

export default function Page() {
  return (
    <Layout
      headerTitle={"Начална страница"}
      basePath={path}
      MainView={<HomeGrid />}
      mainListItems={sideMenu}
    />
  );
}
