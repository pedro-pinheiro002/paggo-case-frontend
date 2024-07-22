import { User } from "@/types/types";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface AuthContextType {
  user: User | null;
  handleLogIn: (idToken: string) => void;
  handleLogOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleLogIn: (idToken: string) => {},
  handleLogOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  function handleLogOut() {
    setUser(null);
  }
  function handleLogIn(idToken: string) {
    setUser(jwtDecode(idToken));
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
