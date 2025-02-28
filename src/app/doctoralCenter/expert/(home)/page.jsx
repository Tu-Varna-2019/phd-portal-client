"use client";
import Layout from "@/components/main-layout/Layout";

import { path } from "../_constants/pathConstant";
import HomeGrid from "../../(manager-expert)/_components/HomeGrid";
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
