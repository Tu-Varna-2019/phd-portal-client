"use client";
import Translate from "@/lib/helpers/Translate";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useEffect } from "react";
import { path } from "../../_constants/pathConstant";

export default function Page() {
  const { language } = Translate();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.replace(
        path +
          "/curriculum/automated-information-processing-and-management-systems/" +
          language
      );
    }
  }, [language, router]);

  return <Loading />;
}
