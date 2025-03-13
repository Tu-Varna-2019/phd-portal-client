"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import ExamsGrid from "../../(manager-expert)/_components/ExamsGrid";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Exams")}
      basePath={path}
      MainView={<ExamsGrid />}
      mainListItems={sideMenu}
    />
  );
}
