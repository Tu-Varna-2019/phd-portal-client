"use client";
import Layout from "@/components/main-layout/Layout";
import HomeGrid from "../_components/HomeGrid";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Home Page")}
      MainView={<HomeGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
