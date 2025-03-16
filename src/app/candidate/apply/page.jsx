"use client";
import Layout from "@/components/main-layout/Layout";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import ApplyGrid from "../_components/ApplyGrid";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();

  return (
    <Layout
      headerTitle={tr("Apply for a PhD")}
      MainView={<ApplyGrid />}
      basePath={path}
      mainListItems={navigation}
    />
  );
}
