import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
}
