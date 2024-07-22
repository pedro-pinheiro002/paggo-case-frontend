"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Content } from "./Content";
import { LogIn } from "./LogIn";

export default function Home() {
  const { user } = useAuthContext();
  return <div className="p-36">{!user ? <LogIn /> : <Content />}</div>;
}
