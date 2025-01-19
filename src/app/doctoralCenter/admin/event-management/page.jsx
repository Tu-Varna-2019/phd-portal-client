"use client";
import Layout from "@/components/main-layout/Layout";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import { useSelector } from "react-redux";

import EventManagementGrid from "@/components/main-layout/components/EventManagementGrid";
import { sideMenuAdminItems } from "@/components/app/doctoralCenter/admin/sideMenuAdminItems";

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
      mainListItems={sideMenuAdminItems}
    />
  );
}
