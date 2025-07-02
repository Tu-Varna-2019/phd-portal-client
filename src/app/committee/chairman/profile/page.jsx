"use client";
import Layout from "@/components/main-layout/Layout";
import { useSelector } from "react-redux";
import { selectCommittee } from "@/features/user/slices/userMemoSelector";
import { setCommittee } from "@/features/user/slices/userSlice";
import { path } from "../_constants/pathConstant";
import ProfileGrid from "@/app/(common)/_profile/_components/ProfileGrid";
import { SideMenuConstants } from "../_constants/sideMenuConstants";
import Translate from "@/lib/helpers/Translate";

export default function Page() {
  const { tr } = Translate();
  const { navigation } = SideMenuConstants();
  const committee = useSelector(selectCommittee);

  const nameFields = [tr("name"), tr("email")];
  const user = {
    name: committee.name,
    email: committee.email,
    picture: committee.picture,
    pictureBlob: committee.pictureBlob,
    role: tr("chairman")
  };

  return (
    <Layout
      headerTitle={tr("Profile")}
      basePath={path}
      MainView={
        <ProfileGrid
          user={user}
          nameFields={nameFields}
          setUser={setCommittee}
        />
      }
      mainListItems={navigation}
    />
  );
}
