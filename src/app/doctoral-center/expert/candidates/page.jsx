"use client";
import Layout from "@/components/main-layout/Layout";
import { path } from "../_constants/pathConstant";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import CandidatesGrid from "../../(manager-expert)/_components/CandidatesGrid";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { navigation } = SideMenuConstants();
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Application Platform")}
      MainView={<CandidatesGrid />}
      basePath={path}
      mainListItems={navigation}
    />
  );
}
