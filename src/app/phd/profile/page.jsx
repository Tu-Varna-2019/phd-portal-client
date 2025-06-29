"use client";
import Layout from "@/components/main-layout/Layout";
import { useSelector } from "react-redux";
import { selectPhd } from "@/features/user/slices/userMemoSelector";
import { setPhd } from "@/features/user/slices/userSlice";
import { path } from "../_constants/pathConstant";
import ProfileGrid from "@/app/(common)/_profile/_components/ProfileGrid";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();
  const phd = useSelector(selectPhd);

  const nameFields = [tr("name"), tr("email")];
  const user = {
    name: phd.name,
    email: phd.email,
    picture: phd.picture,
    pictureBlob: phd.pictureBlob
  };

  return (
    <Layout
      headerTitle={tr("Profile")}
      basePath={path}
      MainView={
        <ProfileGrid user={user} nameFields={nameFields} setUser={setPhd} />
      }
      mainListItems={navigation}
    />
  );
}
