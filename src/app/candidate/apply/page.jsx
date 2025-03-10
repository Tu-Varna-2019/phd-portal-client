"use client";
import Layout from "@/components/main-layout/Layout";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import ApplyGrid from "../_components/ApplyGrid";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation("client-page");

  return (
    <Layout
      headerTitle={t("Apply for a PhD")}
      MainView={<ApplyGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
