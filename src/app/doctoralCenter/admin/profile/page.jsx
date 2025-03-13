"use client";
import Layout from "@/components/main-layout/Layout";

import { useSelector } from "react-redux";
import { selectDoctoralCenter } from "@/features/user/slices/userMemoSelector";
import { setDoctoralCenter } from "@/features/user/slices/userSlice";
import { path } from "../_constants/pathConstant";
import { sideMenu } from "../_constants/sideMenuConstants";
import ProfileGrid from "@/app/(common)/_profile/_components/ProfileGrid";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();
  const doctoralCenter = useSelector(selectDoctoralCenter);

  const nameFields = [tr("name"), tr("email")];
  const user = {
    name: doctoralCenter.name,
    email: doctoralCenter.email,
    picture: doctoralCenter.picture,
    pictureBlob: doctoralCenter.pictureBlob,
    role: tr("admin")
  };

  return (
    <Layout
      headerTitle={"Profile"}
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
