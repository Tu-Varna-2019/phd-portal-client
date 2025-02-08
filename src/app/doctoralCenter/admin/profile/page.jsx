"use client";
import Layout from "@/components/main-layout/Layout";

import { sideMenuOptions } from "@/components/config/doctoralCenter/admin/sideMenu";
import ProfileGrid from "@/components/main-layout/app/ProfileGrid";
import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/lib/features/user/slices/userMemoSelector";
import { setDoctoralCenter } from "@/lib/features/user/slices/userSlice";
import { DEFAULT_DOCTORALCENTER_IMAGE } from "@/models/DoctoralCenter";

export default function Page() {
  const doctoralCenter = useSelector(selectDoctoralCenter);

  const nameFields = ["Име", "Имейл"];
  const user = {
    name: doctoralCenter.name,
    email: doctoralCenter.email,
    picture: doctoralCenter.picture,
    pictureBlob: doctoralCenter.pictureBlob,
    role: "Администратор"
  };

  return (
    <Layout
      headerTitle={"Профил"}
      MainView={
        <ProfileGrid
          user={user}
          nameFields={nameFields}
          setUser={setDoctoralCenter}
          defaultPicture={DEFAULT_DOCTORALCENTER_IMAGE}
        />
      }
      mainListItems={sideMenuOptions}
    />
  );
}
