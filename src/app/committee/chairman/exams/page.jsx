"use client";
import Layout from "@/components/main-layout/Layout";

import { SideMenuConstants } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import ExamsGrid from "../../(chairman-member)/_components/ExamsGrid";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();

  return (
    <Layout
      headerTitle={tr("Exams")}
      basePath={path}
      MainView={<ExamsGrid />}
      mainListItems={navigation}
    />
  );
}
