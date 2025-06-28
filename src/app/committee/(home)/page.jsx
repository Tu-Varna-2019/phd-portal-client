"use client";
import Layout from "@/components/main-layout/Layout";
import HomeGrid from "../_components/HomeGrid";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();

  return (
    <Layout
      headerTitle={tr("Home page")}
      MainView={<HomeGrid />}
      basePath={path}
      mainListItems={navigation}
    />
  );
}
