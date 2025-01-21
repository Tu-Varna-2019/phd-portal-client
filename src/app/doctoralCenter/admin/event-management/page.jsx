"use client";
import Layout from "@/components/main-layout/Layout";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import { useSelector } from "react-redux";

import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";
import EventManagementGrid from "../_components/EventManagementGrid";

export default function Page() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const user = {
    name: doctoralCenter.name,
    email: doctoralCenter.email,
    picture: doctoralCenter.picture
  };

  return (
    <Layout
      headerTitle={"Управление на събития"}
      user={user}
      MainView={EventManagementGrid}
      mainListItems={sideMenuOptions}
    />
  );
}
