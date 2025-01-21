"use client";
import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";
import Layout from "@/components/main-layout/Layout";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import { useSelector } from "react-redux";
import HomeDoctoralCenterGrid from "./_components/HomeDoctralCenterGrid";

export default function Page() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const user = {
    name: doctoralCenter.name,
    email: doctoralCenter.email,
    picture: doctoralCenter.picture
  };

  return (
    <Layout
      headerTitle={"Начална страница"}
      user={user}
      MainView={HomeDoctoralCenterGrid}
      mainListItems={sideMenuOptions}
    />
  );
}
