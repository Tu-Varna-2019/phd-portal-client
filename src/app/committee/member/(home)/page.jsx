"use client";
import Layout from "@/components/main-layout/Layout";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";
import HomeGrid from "../../(chairman-member)/_components/HomeGrid";

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
