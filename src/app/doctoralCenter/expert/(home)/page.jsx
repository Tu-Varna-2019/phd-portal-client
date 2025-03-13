"use client";
import Layout from "@/components/main-layout/Layout";

import { path } from "../_constants/pathConstant";
import HomeGrid from "../../(manager-expert)/_components/HomeGrid";
import { sideMenu } from "../_constants/sideMenuConstants";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Home page")}
      basePath={path}
      MainView={<HomeGrid />}
      mainListItems={sideMenu}
    />
  );
}
