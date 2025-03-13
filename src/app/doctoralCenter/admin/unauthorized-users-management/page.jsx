"use client";
import Layout from "@/components/main-layout/Layout";

import UnauthorizedUsersGrid from "../_components/UnauthorizedUsersGrid";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Unauthorized users")}
      basePath={path}
      MainView={<UnauthorizedUsersGrid />}
      mainListItems={sideMenu}
    />
  );
}
