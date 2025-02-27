"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import ExamsGrid from "../_components/ExamsGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Изпити"}
      basePath={path}
      MainView={<ExamsGrid />}
      mainListItems={sideMenu}
    />
  );
}
