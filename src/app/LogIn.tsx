"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { getTokens } from "@/http/api";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

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
  return (
    <div className="flex flex-col items-center gap-12">
      <h1 className="text-9xl font-bold text-slate-50">Img2Text</h1>
      <Button onClick={onLogin} className="flex gap-2">
        <Image
          alt="google_logo"
          src={"/google_logo.svg"}
          width={20}
          height={20}
        />
        Log In with Google
      </Button>
    </div>
  );
}
