"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { getTokens } from "@/http/api";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export function LogIn() {
  const { handleLogIn } = useAuthContext();
  const onLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const { id_token } = await getTokens(code);
      console.log(jwtDecode(id_token));
      handleLogIn(id_token);
    },
    flow: "auth-code",
  });
  return <Button onClick={onLogin}>Log In with Google</Button>;
}
