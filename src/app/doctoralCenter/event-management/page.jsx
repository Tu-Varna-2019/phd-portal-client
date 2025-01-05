"use client";
import Layout from "@/components/main-layout/Layout";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import { useSelector } from "react-redux";

import { mainListItems } from "@/components/app/doctoralCenter/mainListItems";
import EventManagementGrid from "@/components/main-layout/components/EventManagementGrid";

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
      mainListItems={mainListItems}
    />
  );
}
