"use client";
import Layout from "@/components/main-layout/Layout";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import ContestsGrid from "../_components/ContestsGrid";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Announcement of competitions for PhD students")}
      MainView={<ContestsGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
