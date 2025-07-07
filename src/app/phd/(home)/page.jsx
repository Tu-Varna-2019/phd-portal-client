"use client";
import Layout from "@/components/main-layout/Layout";

import { path } from "../_constants/pathConstant";
import HomeGrid from "../_components/HomeGrid";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { navigation } = SideMenuConstants();
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Home page")}
      basePath={path}
      MainView={<HomeGrid />}
      mainListItems={navigation}
    />
  );
}
