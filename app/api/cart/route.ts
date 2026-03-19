import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json({ error: "productId required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const cookieStore = await cookies();
    let sessionId = cookieStore.get("cart_session")?.value;

    if (!sessionId) {
      sessionId = randomUUID();
      cookieStore.set("cart_session", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    let cart = await prisma.cart.findFirst({ where: { sessionId } });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { sessionId },
      });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          name: product.name,
          price: product.price,
          currency: product.currency,
        },
      });
    }

    const cartData = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, cart: cartData });
  } catch (error) {
    console.error("Cart error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session")?.value;

    if (!sessionId) {
      return NextResponse.json({ cart: null, items: [] });
    }

    const cart = await prisma.cart.findFirst({
      where: { sessionId },
      include: { items: true },
    });

    return NextResponse.json({ cart, items: cart?.items ?? [] });
  } catch (error) {
    console.error("Cart error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
