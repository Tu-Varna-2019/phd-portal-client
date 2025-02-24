"use client";
import Layout from "@/components/main-layout/Layout";

import UnauthorizedUsersGrid from "../_components/UnauthorizedUsersGrid";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";

export default function Page() {
  return (
    <Layout
      headerTitle={"Неудостоверени потребители"}
      basePath={path}
      MainView={<UnauthorizedUsersGrid />}
      mainListItems={sideMenu}
    />
  );
}
