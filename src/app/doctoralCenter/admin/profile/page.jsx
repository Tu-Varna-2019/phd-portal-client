"use client";
import Layout from "@/components/main-layout/Layout";

import ProfileGrid from "@/components/main-layout/app/ProfileGrid";
import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { setDoctoralCenter } from "@/features/user/slices/userSlice";
import { path } from "../_constants/pathConstant";
import { sideMenu } from "../_constants/sideMenuConstants";

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
      basePath={path}
      MainView={
        <ProfileGrid
          user={user}
          nameFields={nameFields}
          setUser={setDoctoralCenter}
        />
      }
      mainListItems={sideMenu}
    />
  );
}
