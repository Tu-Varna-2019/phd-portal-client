"use client";
import Layout from "@/components/main-layout/Layout";
import { sideMenu } from "../../_constants/sideMenuConstants";
import { path } from "../../_constants/pathConstant";

export default function Page() {
  return (
    <Layout
      headerTitle={
        "Автоматизирани системи за обработка и управление на информация"
      }
      MainView={<></>}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
