"use client";
import Layout from "@/components/main-layout/Layout";
import { SideMenuConstants } from "../../_constants/sideMenuConstants";
import { path } from "../../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";
import HomeGridEN from "../../_components/HomeGridEN";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();

  return (
    <Layout
      headerTitle={tr("Home Page")}
      MainView={<HomeGridEN />}
      basePath={path}
      mainListItems={navigation}
    />
  );
}
