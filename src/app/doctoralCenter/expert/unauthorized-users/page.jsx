"use client";
import Layout from "@/components/main-layout/Layout";
import { path } from "../_constants/pathConstant";
import { sideMenu } from "../_constants/sideMenuConstants";
import UnauthorizedUsersGrid from "../../(manager-expert)/_components/UnauthorizedUsersGrid";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Удостоверени потребители")}
      MainView={<UnauthorizedUsersGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
