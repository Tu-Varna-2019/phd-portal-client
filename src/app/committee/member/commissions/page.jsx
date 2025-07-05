"use client";
import Layout from "@/components/main-layout/Layout";

import { SideMenuConstants } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";
import CommissionsGrid from "../../(chairman-member)/_components/CommissionsGrid";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();

  return (
    <Layout
      headerTitle={tr("Commissions")}
      basePath={path}
      MainView={<CommissionsGrid />}
      mainListItems={navigation}
    />
  );
}
