import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import type { Cart, CartItem } from "@/app/generated/prisma";

export type CartWithItems = Cart & { items: CartItem[] };

export async function getCart(): Promise<CartWithItems | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;

  if (!sessionId) return null;

  const cart = await prisma.cart.findFirst({
    where: { sessionId },
    include: { items: true },
  });

  return cart as CartWithItems | null;
}

export async function getCartCount(): Promise<number> {
  const cart = await getCart();
  if (!cart) return 0;
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

export async function getCartTotal(): Promise<number> {
  const cart = await getCart();
  if (!cart) return 0;
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
