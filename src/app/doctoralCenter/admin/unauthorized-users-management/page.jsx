"use client";
import Layout from "@/components/main-layout/Layout";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import { useSelector } from "react-redux";

import UnauthorizedUsersGrid from "@/components/main-layout/components/UnauthorizedUsersGrid";
import { mainListItems } from "@/components/app/doctoralCenter/admin/mainListItems";

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
      mainListItems={mainListItems}
    />
  );
}
