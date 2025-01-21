"use client";
import Layout from "@/components/main-layout/Layout";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import { useSelector } from "react-redux";

import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";
import UnauthorizedUsersGrid from "../_components/UnauthorizedUsersGrid";

export default function Page() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const user = {
    name: doctoralCenter.name,
    email: doctoralCenter.email,
    picture: doctoralCenter.picture
  };

  return (
    <Layout
      headerTitle={"Неудостоверени потребители"}
      user={user}
      MainView={UnauthorizedUsersGrid}
      mainListItems={sideMenuOptions}
    />
  );
}
