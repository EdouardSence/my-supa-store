"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { AuthActionState } from "@/lib/auth-state";

function getTrimmedValue(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = getTrimmedValue(formData, "name");
  const email = getTrimmedValue(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Tous les champs sont requis.", success: null };
  }

  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères.", success: null };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Un compte existe déjà avec cet email.", success: null };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return { error: null, success: "Compte créé. Vous pouvez vous connecter." };
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = getTrimmedValue(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email et mot de passe requis.", success: null };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { error: null, success: null };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Identifiants invalides.", success: null };
    }
    throw error;
  }
}

export async function logoutAction(_prevState: null): Promise<null> {
  void _prevState;
  await signOut({ redirectTo: "/" });
  return null;
}
