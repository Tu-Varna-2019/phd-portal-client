"use client";
import Layout from "@/components/main-layout/Layout";
import { sideMenu } from "../../_constants/sideMenuConstants";
import { path } from "../../_constants/pathConstant";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation("client-page");

  return (
    <Layout
      headerTitle={t("Automated information processing and management systems")}
      MainView={<></>}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
