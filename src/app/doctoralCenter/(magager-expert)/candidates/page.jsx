"use client";
import Layout from "@/components/main-layout/Layout";
import DoctoralCenterCandidatesGrid from "../_components/DoctoralCenterCandidatesGrid";
import { sideMenuOptionsDoctoralCenter } from "@/components/config/doctoralCenter/manager-expert/sideMenuOptionsDoctoralCenter";

export default function Page() {
  return (
    <Layout
      headerTitle={"Платформа за кандидатстване"}
      MainView={DoctoralCenterCandidatesGrid()}
      mainListItems={sideMenuOptionsDoctoralCenter}
    />
  );
}
