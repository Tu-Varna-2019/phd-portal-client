"use client";
import Layout from "@/components/main-layout/Layout";
import Translate from "@/lib/helpers/Translate";
import { path } from "@/app/candidate/_constants/pathConstant";
import { SideMenuConstants } from "@/app/candidate/_constants/sideMenuConstants";
import AutomatedInfoProcessingMngmentSystemsBG from "@/app/candidate/_components/AutomatedInfoProcessingMngmentSystemsBG";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();

  return (
    <Layout
      headerTitle={tr(
        "Automated information processing and management systems"
      )}
      MainView={<AutomatedInfoProcessingMngmentSystemsBG />}
      basePath={path}
      mainListItems={navigation}
    />
  );
}
