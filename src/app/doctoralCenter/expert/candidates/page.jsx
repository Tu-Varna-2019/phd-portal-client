"use client";
import Layout from "@/components/main-layout/Layout";
import DoctoralCenterCandidatesGrid from "../_components/DoctoralCenterCandidatesGrid";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";

export default function Page() {
  return (
    <Layout
      headerTitle={"Платформа за кандидатстване"}
      MainView={<DoctoralCenterCandidatesGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
