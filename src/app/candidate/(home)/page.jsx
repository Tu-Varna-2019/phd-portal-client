"use client";
import Translate from "@/lib/helpers/Translate";
import { useRouter } from "next/navigation";
import { path } from "../_constants/pathConstant";
import Loading from "@/app/loading";
import { useEffect } from "react";

export default function Page() {
  const { language } = Translate();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.replace(path + "/" + language);
    }
  }, [language, router]);

  return <Loading />;
}
