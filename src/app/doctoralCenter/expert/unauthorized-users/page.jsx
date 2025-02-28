"use client";
import Layout from "@/components/main-layout/Layout";
import { path } from "../_constants/pathConstant";
import { sideMenu } from "../_constants/sideMenuConstants";
import UnauthorizedUsersGrid from "../../(manager-expert)/_components/UnauthorizedUsersGrid";

export default function Page() {
  return (
    <Layout
      headerTitle={"Удостоверени потребители"}
      MainView={<UnauthorizedUsersGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
