"use client";
import Layout from "@/components/main-layout/Layout";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import CandidatesGrid from "../_components/CandidatesGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Платформа за кандидатстване"}
      MainView={<CandidatesGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
