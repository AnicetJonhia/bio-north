"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Les identifiants admin ne sont pas configurés dans les variables d'environnement.");
}

const ADMIN_CREDENTIALS = {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
}


export async function login(email: string, password: string) {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const cookieStore = await cookies()
    cookieStore.set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    })
    return { success: true }
  }
  return { success: false, error: "Identifiants incorrects" }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
  redirect("/admin/login")
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")
  return session?.value === "authenticated"
}

export async function requireAuth() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect("/admin/login")
  }
  return authenticated
}
