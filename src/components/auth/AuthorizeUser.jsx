"use client";

import selectUser from "@/lib/features/user/slices/userMemoSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AuthorizeUser() {
  const user = useSelector(selectUser);
  const [type, setType] = useState("");

  useEffect(() => {
    verifyRole();
  }, []);

  const verifyRole = async () => {
    const result = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        Authorization: user.accessToken
      },
      body: JSON.stringify({
        oid: user.oid,
        name: user.name,
        email: user.email
      })
    });
    const res = await result.json();
    setType(res.role);
    console.log(`Type is ${type}!`);
  };

  return {
    verifyRole
  };
}
