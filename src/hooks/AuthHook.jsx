import { useDispatch } from "react-redux";
import { useMsal } from "@azure/msal-react";
import { setUser } from "@/features/user/slices/userSlice";
import { loginRequest } from "@/lib/auth/authConfig";
import { useAppDispatch } from "@/lib/features/constants";

export default function AuthHook() {
  const { instance } = useMsal();
  const dispatch = useAppDispatch();

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
