"use client";
import Layout from "@/components/main-layout/Layout";
import { SideMenuConstants } from "../../_constants/sideMenuConstants";
import { path } from "../../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";
import HomeGridBG from "../../_components/HomeGridBG";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();

  return (
    <Layout
      headerTitle={tr("Home Page")}
      MainView={<HomeGridBG />}
      basePath={path}
      mainListItems={navigation}
    />
  );
}
