import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    MY_SECRET_TOKEN: process.env.MY_SECRET_TOKEN,
  });
}
