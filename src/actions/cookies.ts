"use server";
import { cookies } from "next/headers";

export async function setCookies(id: string, value: string) {
  cookies().set(id, value, {
    maxAge: 60 * 60 * 1,
  });
}
export async function getCookies(id: string) {
  const cookie = cookies().get(id);
  if (!cookie) return null;
  return cookie.value;
}

export async function removeCookies(id: string) {
  cookies().delete(id);
}