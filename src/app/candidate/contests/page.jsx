"use client";
import Layout from "@/components/main-layout/Layout";
import { sideMenu } from "../_constants/sideMenuConstants";
import { path } from "../_constants/pathConstant";
import ContestsGrid from "../_components/ContestsGrid";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation("client-page");

  return (
    <Layout
      headerTitle={t("Announcement of competitions for PhD students")}
      MainView={<ContestsGrid />}
      basePath={path}
      mainListItems={sideMenu}
    />
  );
}
