"use client";
import Layout from "@/components/main-layout/Layout";
import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { setDoctoralCenter } from "@/features/user/slices/userSlice";
import { path } from "../_constants/pathConstant";
import ProfileGrid from "@/app/(common)/profile/_components/ProfileGrid";
import { sideMenu } from "../_constants/sideMenuConstants";

export default function Page() {
  const doctoralCenter = useSelector(selectDoctoralCenter);

  const nameFields = ["Име", "Имейл"];
  const user = {
    name: doctoralCenter.name,
    email: doctoralCenter.email,
    picture: doctoralCenter.picture,
    pictureBlob: doctoralCenter.pictureBlob,
    role: "Експерт"
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
