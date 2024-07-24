import { removeCookies } from "@/actions/cookies";
import { getCookies, setCookies } from "@/actions/cookies";
import { getRefreshedTokens } from "@/http/api";
import { User } from "@/types/types";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  handleLogIn: (idToken: string, refresh_token: string, user: User) => void;
  handleLogOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleLogIn: (idToken: string) => {},
  handleLogOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    if (!idToken) {
      getCookies("refresh_token").then((refresh_token) => {
        if (refresh_token) {
          getRefreshedTokens(refresh_token)
            .then((data) => {
              setIdToken(data.tokens.id_token);
              setUser(data.user);
            })
            .catch((error) => console.error(error));
        }
      });
    }
  }, []);

  function handleLogOut() {
    setUser(null);
    setIdToken(null);
    removeCookies("refresh_token");
  }
  function handleLogIn(idToken: string, refresh_token: string, user: User) {
    setUser(user);
    setIdToken(idToken);
    setCookies("refresh_token", refresh_token);
  }
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_OAUTH_ACCESS_KEY_ID as string}
    >
      <AuthContext.Provider value={{ user, handleLogIn, handleLogOut }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}
