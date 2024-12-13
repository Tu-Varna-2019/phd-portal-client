import { useDispatch } from "react-redux";
import { useMsal } from "@azure/msal-react";
import { setUser } from "@/features/user/userSlice.jsx";
import { loginRequest } from "@/lib/auth/authConfig";

export default function AuthHook() {
  const { instance } = useMsal();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const response = await instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });

    if (response) dispatch(setUser({ response }));
  };

  return {
    handleLogin
  };
}
