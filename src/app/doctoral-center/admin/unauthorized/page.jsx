"use client";
import Layout from "@/components/main-layout/Layout";

import UnauthorizedUsersGrid from "../_components/UnauthorizedUsersGrid";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { navigation } = SideMenuConstants();
  const { tr } = Translate();

  return (
    <Layout
      headerTitle={tr("Unauthorized users")}
      basePath={path}
      MainView={<UnauthorizedUsersGrid />}
      mainListItems={navigation}
    />
  );
}
